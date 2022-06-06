import { createMessage } from '../../utils';

const createUIMessage = <Message>(message: Message) => ({
  pluginMessage: createMessage(message),
});

export default createUIMessage;
