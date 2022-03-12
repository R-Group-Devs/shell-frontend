import PQueue from 'p-queue';

interface MetadataUrl {
  ipfsUri?: string;
  httpsUri: string;
}

type MetadataImage =
  | {
      type: 'inline-svg';
      svgDocument: string;
    }
  | { type: 'url'; url: MetadataUrl };

export interface NFTMetadata {
  name: string;
  description: string;
  image: MetadataImage;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  external_url?: string;
  source: 'inline-json' | 'ipfs' | 'https';
  rawTokenUri: string;
}

const fetchQueue = new PQueue({ concurrency: 4 });

/** handle all types of values for tokenURI() */
export const resolveMetadataByTokenURI = async (uri: string): Promise<NFTMetadata> => {
  const [prefix, encoded] = uri.split(',');

  // inline
  if (prefix === 'data:application/json;base64') {
    const json = atob(encoded);
    const parsed = JSON.parse(json);

    return {
      rawTokenUri: uri,
      source: 'inline-json',
      name: parsed.name ?? '',
      description: parsed.description ?? '',
      image: processImage(parsed.image ?? ''),
      attributes: parsed.attributes ?? [],
      external_url: parsed.external_url ?? undefined,
    };
  }

  // external
  const { httpsUri, ipfsUri } = processUri(uri);
  const resp = await fetchQueue.add(() => fetch(httpsUri));
  const json = await resp.json();

  return {
    rawTokenUri: uri,
    source: ipfsUri ? 'ipfs' : 'https',
    name: json.name ?? '',
    description: json.description ?? '',
    image: processImage(json.image ?? ''),
    attributes: json.attributes ?? [],
    external_url: json.external_url ?? '',
  };
};

/** given the `image` field in metadata, expand to a url or svg doc */
export const processImage = (uri: string): MetadataImage => {
  const [prefix, encoded] = uri.split(',');

  // inline
  if (prefix === 'data:image/svg+xml;base64') {
    return {
      type: 'inline-svg',
      svgDocument: atob(encoded),
    };
  }

  return {
    type: 'url',
    url: processUri(uri),
  };
};

/** given a uri, expand with ipfs gateway if needed */
export const processUri = (uri: string): MetadataUrl => {
  // if it ends with anything that looks like /ipfs/WHATEVER, assume thats the
  // hash
  const match = uri.match(/ipfs\/(.*)$/);
  if (match) {
    return {
      ipfsUri: `ipfs://ipfs/${match[1]}`,
      httpsUri: `https://ipfs.heyshell.xyz/ipfs/${match[1]}`,
    };
  }

  // otherwise, is just straight up https
  const isHttps = /^https:\/\//.test(uri);
  if (isHttps) {
    return { httpsUri: uri };
  }

  throw new Error(`invalid uri: ${uri}`);
};
