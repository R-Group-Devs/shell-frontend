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

interface FormData {
  name: string;
  symbol: string;
  owner: string;
  engine: string;
}

export const LaunchCollectionPage: FunctionComponent = () => {
  const { browseChainInfo, account } = useWallet();
  const theme = useTheme<ThemeConfig>();
  const { register, setValue, watch, handleSubmit, formState, trigger, getValues } = useForm<FormData>();

  const submit = handleSubmit(() => {
    console.log(getValues());
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
          <h3>Information</h3>
          <TwoPanel>
            <Content gap={4}>
              <div>
                <strong>Name</strong>
                <Input placeholder="My NFT Collection" {...register('name', { required: true })} />
                <InputError error={formState.errors.name} />
              </div>
              <div>
                <strong>Symbol</strong>
                <Input placeholder="MY-NFT" {...register('symbol', { required: true })} />
                <InputError error={formState.errors.symbol} />
              </div>
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
                  Randon name
                </Button>
              </div>
            </Content>
            <Content>
              <p>
                Collection information <strong>cannot be modified after deployment</strong>.
              </p>
              <p>This information will be shown on marketplaces and tools like etherscan.</p>
            </Content>
          </TwoPanel>
          <h3>Engine</h3>
          <TwoPanel>
            <Content gap={4}>
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
                    },
                  })}
                />
                <InputError error={formState.errors.engine} />
              </div>
            </Content>
            <Content>
              <p>
                A collection's engine is responsible for rendering NFT metadata, resolving royalties, and handling
                minting.
              </p>
            </Content>
          </TwoPanel>
          <h3>Owner</h3>
          <TwoPanel>
            <Content gap={4}>
              <div>
                <strong>Owner address</strong>
                <Input
                  placeholder="0x1234...1234"
                  {...register('owner', {
                    required: true,

                    validate: async (value) => {
                      if (!utils.isAddress(value)) {
                        return 'Invalid address';
                      }
                    },
                  })}
                />
                <InputError error={formState.errors.owner} />
              </div>
              <div style={{ display: 'flex', gap: theme.spacing(4) }}>
                <Button
                  requireConnection
                  onClick={() => {
                    setValue('owner', account);
                    trigger('owner');
                  }}
                  disabled={watch('owner') === account}
                >
                  Set self as owner
                </Button>
                <Button
                  onClick={() => {
                    setValue('owner', constants.AddressZero);
                    trigger('owner');
                  }}
                  disabled={watch('owner') === constants.AddressZero}
                >
                  No owner
                </Button>
              </div>
            </Content>
            <Content>
              <p>The owner of a collection can hot-swap the installed engine at any time.</p>
              <p>Depending on the installed engine, the collection owner may have additional permissions.</p>
            </Content>
          </TwoPanel>
          <div>
            <h3>Deploy</h3>
            <ButtonGroup>
              <Button requireConnectedChainId={browseChainInfo.chainId} onClick={submit}>
                Launch collection
              </Button>
            </ButtonGroup>
          </div>
        </Content>
      </form>
    </PageSection>
  );
};
