export type MsgChat = {
    id: string
    msg?: string
    username: string
    userid: string
    type: number
}

export type Message = {
    type: number
    content: Login | JoinLeave | Chat | Players | State | ImageDrawing | Theme | Connection | RoomCommand | Winner;
}

//Message Types
export enum MessageType {
    Login = 0,
    JoinLeave = 1,
    Chat = 2,
    Players = 3,
    GameState = 4,
    Image = 5,
    Theme = 6,
    Winner = 7,
    Connection = 8,
}

//GameStates Types
export enum GameState {
    Drawing = "Drawing",
    LoadingDrawing = "LoadingDrawing",
    Voting = "Voting",
    LoadingVoting = "LoadingVoting",
    Recolecting = "Recolecting",
    RecolectingVotes = "RecolectingVotes",
    Start = "Start",
    Loading = "Loading",
    Winner = "Winner",
    LoadingWinner = "LoadingWinner",
    Waiting = "Waiting"
}

export enum RoomCommands {
    Create = "Create",
    JoinCreate = "JoinCreate"
}

export type RoomCommand = {
    command: string
    roomid: string
}

//Message Content
export type Login = {
    username: string
    userid: string
}

export type JoinLeave = {
    id: string
    username: string
    userid: string
    msg: string
}

export type Chat = {
    id: string
    roomid: string
    userid: string
    username: string
    msg: string
}

export type Player = {
    id: string
    name: string
    roomid: string
}

export type Players = {
    data: Player[]
}

export type State = {
    gameState: GameState
}

export type ImageDrawing = {
    userid: string
    img: string
}

export type Winner = {
    userid: string
    img: string
    username: string
}

export type Theme = {
    theme: string
}

export type Connection = {
    status: string
    roomid: string
    roomtype: string
}