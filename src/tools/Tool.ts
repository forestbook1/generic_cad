export interface Tool {
  name: string;
  //label: string; // UI表示名（例：「ボクセル配置」）
  //icon?: string; // アイコン（クラス名やURL）
  setEnabled(enabled: boolean): void;  
}