import React, { FunctionComponent, useState } from 'react';
import { constants, utils } from 'ethers';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { ConnectionWarning } from '../components/ConnectionWarning';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { Input } from '../components/Input';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import { randomNameAndSymbol } from '../lib/string';
import { useTheme } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';
import { InputError } from '../components/InputError';
import { isValidEngine } from '../shell/engine';
import { createCollection } from '../shell/factory';

interface FormData {
  name: string;
  symbol: string;
  engine: string;
}

export const LaunchCollectionPage: FunctionComponent = () => {
  const { browseChainInfo, account, library, registerTransaction } = useWallet();
  const { register, setValue, handleSubmit, formState, trigger, getValues } = useForm<FormData>();

  const submit = handleSubmit(async () => {
    const trx = await createCollection(library.getSigner(), {
      ...getValues(),
      owner: account,
    });
    registerTransaction(trx);
  });

  return (
    <PageSection>
      <form>
        <Content>
          <div>
            <h2>
              Launch collection <Dimmed>[{browseChainInfo.name}]</Dimmed>
            </h2>
            <p>
              Deploy a new NFT contract with <Shell />.
            </p>
          </div>
          <ConnectionWarning />
          <div>
            <h3>Config</h3>
            <p style={{ maxWidth: '800px', lineHeight: '1.8' }}>
              Collection information <strong>cannot be modified after deployment</strong>. This information will be
              shown on marketplaces and tools like etherscan.
            </p>
          </div>
          <TwoPanel template="2fr 1fr 1fr" alignItems="center">
            <Content>
              <div>
                <strong>Name</strong>
                <Input placeholder="My NFT Collection" {...register('name', { required: true })} />
                <InputError error={formState.errors.name} />
              </div>
            </Content>
            <Content>
              <div>
                <strong>Symbol</strong>
                <Input placeholder="MY-NFT" {...register('symbol', { required: true })} />
                <InputError error={formState.errors.symbol} />
              </div>
            </Content>
            <Content>
              <div>
                <Button
                  onClick={() => {
                    const { name, symbol } = randomNameAndSymbol();
                    setValue('name', name);
                    setValue('symbol', symbol);
                    trigger('name');
                    trigger('symbol');
                  }}
                >
                  Random name
                </Button>
              </div>
            </Content>
          </TwoPanel>
          <div>
            <h3>Engine</h3>
            <p style={{ maxWidth: '800px', lineHeight: '1.8' }}>
              <p>
                Every collection is running an <strong>engine</strong> which controls NFT appearance, royalties,
                minting, and advanced interactions. Collection owners can install a different engine at any time.
              </p>
            </p>
          </div>
          <div>
            <TwoPanel alignItems="center">
              <Content>
                <div>
                  <strong>Engine address</strong>
                  <Input
                    placeholder="0x1234...1234"
                    {...register('engine', {
                      required: true,
                      validate: async (value) => {
                        if (!utils.isAddress(value)) {
                          return 'Invalid address';
                        }
                        const isValid = await isValidEngine(browseChainInfo.chainId, value);
                        return isValid || 'Invalid engine';
                      },
                    })}
                  />
                  <InputError error={formState.errors.engine} />
                </div>
              </Content>
              <Content>
                <div>
                  <Button disabled>Browse engines... (comming soon)</Button>
                </div>
              </Content>
            </TwoPanel>
          </div>
          <Content>
            <div>
              <h3>Deploy</h3>
              <p style={{ maxWidth: '800px', lineHeight: '1.8' }}>
                <p>You will be the owner of this collection.</p>
              </p>
            </div>
            <ButtonGroup>
              <Button requireConnectedChainId={browseChainInfo.chainId} onClick={submit}>
                Launch your collection
              </Button>
            </ButtonGroup>
          </Content>
        </Content>
      </form>
    </PageSection>
  );
};
