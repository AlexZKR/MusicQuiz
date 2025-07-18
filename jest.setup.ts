import { TextEncoder } from 'util';

// Polyfill TextEncoder/Decoder for Jest’s JSDOM
global.TextEncoder = TextEncoder;
