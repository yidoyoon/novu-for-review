import { ChannelTypeEnum } from '../template/template.interface';
import { ProviderStore } from './provider.store';

test('should register a provider', async () => {
  const store = new ProviderStore();

  await store.addProvider({
    id: 'test',
    channelType: ChannelTypeEnum.SMS,
    sendMessage: () => null,
  });

  const providers = await store.getProviders();
  expect(providers.length).toEqual(1);
  expect(providers[0].id).toEqual('test');
});

test('should get a provider by id', async () => {
  const store = new ProviderStore();

  await store.addProvider({
    id: 'test',
    channelType: ChannelTypeEnum.SMS,
    sendMessage: () => null,
  });

  await store.addProvider({
    id: 'test 2',
    channelType: ChannelTypeEnum.EMAIL,
    sendMessage: () => null,
  });

  const provider = await store.getProviderById('test');
  expect(provider).toBeTruthy();
  expect(provider.id).toEqual('test');
});

test('should get a provider by channel', async () => {
  const store = new ProviderStore();

  await store.addProvider({
    id: 'test',
    channelType: ChannelTypeEnum.SMS,
    sendMessage: () => null,
  });

  await store.addProvider({
    id: 'test 2',
    channelType: ChannelTypeEnum.EMAIL,
    sendMessage: () => null,
  });

  const provider = await store.getProviderByChannel(ChannelTypeEnum.EMAIL);
  expect(provider).toBeTruthy();
  expect(provider.id).toEqual('test 2');
});
