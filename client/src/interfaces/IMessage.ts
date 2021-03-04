export enum MessageType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface IMessage {
  type: MessageType
  text: string
}
