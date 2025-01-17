import styles from './styles.module.css';
import { useState, useCallback } from 'react';
import {
  TableEditableEditorProps,
  TableEditableContentProps,
} from './TableEditableCell';
import createTableCellType from './createTableCellType';
import { Decimal } from 'decimal.js';
import TableCellContent from './TableCellContent';

function TableCellDecimalEditor({
  value,
  onExit,
  readOnly,
}: TableEditableEditorProps) {
  const [editValue, setEditValue] = useState(value);

  const onLostFocus = useCallback(() => {
    if (onExit) {
      onExit(false, editValue);
    }
  }, [onExit, editValue]);

  return (
    <input
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onLostFocus();
        }
      }}
      readOnly={readOnly}
      autoFocus
      type="text"
      className={`${styles.input} ${styles.number}`}
      style={{ textAlign: 'right' }}
      onBlur={onLostFocus}
      onChange={(e) => setEditValue(e.currentTarget.value)}
      value={editValue as string}
    />
  );
}

function TableCellDecimalContent({ value }: TableEditableContentProps) {
  return <TableCellContent right value={value} />;
}

const TableCellDecimal = createTableCellType({
  diff: (prev: string, current: string) => {
    if (prev && current) {
      const dprev = new Decimal(prev);
      const dcur = new Decimal(current);
      return !dprev.eq(dcur);
    }
    return prev !== current;
  },
  content: TableCellDecimalContent,
  editor: TableCellDecimalEditor,
});

export default TableCellDecimal;
