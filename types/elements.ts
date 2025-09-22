export interface ElementType {
  id: string;
  type: 'text' | 'shape' | 'image';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
    opacity?: string;
    padding?: string;
    fontStyle?: string;
    textDecoration?: string;
  };
}