export interface IProps {
  label: string;
  validation: () => string;
  handleCallback: (selectedId: number) => void;
  selectionData: ISelectionData[];
  fetchError: string
}

export interface ISelectionData {
  name: string
  id: number
}