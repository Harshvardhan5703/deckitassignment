export interface ElementStyle {
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
  position?: 'absolute' | 'relative' | 'fixed' | 'static';
  zIndex?: string;
  transform?: string;
  display?: string;
  overflow?: string;
  cursor?: string;
  userSelect?: 'none' | 'auto' | 'text' | 'all';
  pointerEvents?: 'none' | 'auto';
  boxSizing?: 'border-box' | 'content-box';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | 'none';
}

export interface ElementType {
  id: string;
  type: 'text' | 'shape' | 'image' | 'line' | 'table' | 'icon';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: ElementStyle;
  subtype?: string; 
  htmlElement?: HTMLElement; 
}