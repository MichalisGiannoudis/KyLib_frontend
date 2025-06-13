import { AuthContent } from "./authContent.interface";
import { BookContent } from "./bookContent.interface";

export interface ContentMap {
    [key: string]: BookContent | AuthContent;
}