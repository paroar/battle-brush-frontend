export type MsgChat = {
    msg?: string
    username: string
    type: string
}

export type Message = {
    type: string
    content: Login | JoinLeave | Chat | Players | State | ImageDrawing | Theme;
}

//Message Types
export enum MessageType {
    Login = "Login",
    JoinLeave = "JoinLeave",
    Chat = "Chat",
    Players = "Players",
    GameState = "GameState",
    Image = "Image",
    Vote = "Vote",
    Theme = "Theme",
    Winner = "Winner",
}

//GameStates Types

export enum GameState {
    Drawing = "Drawing",
    Voting = "Voting",
    Recolecting = "Recolecting",
    RecolectingVotes = "RecolectingVotes",
    Start = "Start",
    Loading = "Loading",
    Winner = "Winner",
    Waiting = "Waiting"
}

//Message Content
export type Login = {
    username: string
    userid: string
}

export type JoinLeave = {
    username: string
    userid: string
    msg: string
}

export type Chat = {
    username: string
    msg: string
}

export type Players = {
    usernames: string[]
}

export type State = {
    gameState: string
}

export type ImageDrawing = {
    userid: string
    img: string
    username: string
}

export type Theme = {
    theme: string
}