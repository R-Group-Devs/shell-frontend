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
  source: 'inline-json' | 'url';
  rawTokenUri: string;
}

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

  throw new Error();
};

/** given the `image` field in metadata, expand to a url or svg doc */
export const processImage = (uri: string): MetadataImage => {
  return {
    type: 'url',
    url: processUri(uri),
  };
};

/** given a uri, expand with ipfs gateway if needed */
export const processUri = (uri: string): MetadataUrl => {
  return {
    httpsUri: uri,
  };
};
