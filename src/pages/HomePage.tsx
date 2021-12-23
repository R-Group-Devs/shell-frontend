import React, { FunctionComponent, useEffect, useState } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

import { Bangers } from '../components/Bangers';
import { Whomst } from '../components/Whomst';
import { Button } from '../components/Button';
import { getTaps } from '../lib/storage';
import { TwoPanel } from '../components/TwoPanel';

export const HomePage: FunctionComponent = () => {
  const [taps, setTaps] = useState(getTaps());

  useEffect(() => {
    // lol
    const h = setInterval(() => setTaps(getTaps()), 250);
    return () => clearInterval(h);
  }, []);

  return (
    <PageSection>
      <Content>
        <TwoPanel alignItems="center">
          <Content>
            <h1 style={{ maxWidth: '500px' }}>
              On-chain <br />
              NFT
              <br /> application development framework
              <br /> for <Whomst />
            </h1>
          </Content>
          <Content>
            <p style={{ textAlign: 'center' }}>
              <img
                style={{ maxWidth: '300px', display: 'inline' }}
                src="https://ipfs.hypervibes.xyz/ipfs/QmcnWsZVxNiozUjYc1qtJTRsseES4523FRzSS8PXRhWdJZ"
              />
            </p>
          </Content>
        </TwoPanel>

        {taps < 5 ? (
          <>
            <p>
              Upcoming public NFT infrastructure from <strong>R Group</strong> @{' '}
              <a href="https://t.co/k8lIDvcPT9">Rarible DAO</a>.
            </p>
            <p>
              What excites you about <Shell /> ?
            </p>
            <Bangers />
          </>
        ) : (
          <>
            <TwoPanel gapOnCollapse>
              <Content>
                <p>
                  Launch custom business logic in a public application market of NFT <strong>engines</strong>.{' '}
                </p>
                <p>Build interoperable and open products that anybody can iterate on permissionlessly.</p>
                {/* <p></p>
                <p>Deploy a creator-owned collection as part of a digitally-cordinated community.</p>
                <p>Explore emergent application layers.</p> */}
                {/* <p>100% trustless and free forever.</p> */}
                <p style={{ textAlign: 'center' }}>Fork anything.</p>
              </Content>
              <Content>
                <p style={{ textAlign: 'center', marginTop: '22px' }}>
                  <Shell /> is a public, token-based operating system.
                </p>
                <p style={{ textAlign: 'center', marginBottom: '22px' }}>
                  <Button navTo="/launch">Launch a collection</Button>
                </p>
              </Content>
            </TwoPanel>
            <PageSection>
              <Content>
                <p style={{ textAlign: 'center', margin: '60px 0' }}>
                  Upcoming public NFT infrastructure
                  <br />
                  from <strong>R Group</strong> @ <a href="https://t.co/k8lIDvcPT9">Rarible DAO</a>.
                </p>
              </Content>
            </PageSection>
          </>
        )}
      </Content>
    </PageSection>
  );
};
