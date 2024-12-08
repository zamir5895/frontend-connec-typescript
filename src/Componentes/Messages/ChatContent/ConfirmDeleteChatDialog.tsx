import React from 'react';
import Button from '../Utils/Button';

interface ConfirmDeleteChatDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteChatDialog: React.FC<ConfirmDeleteChatDialogProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h3 className="text-lg font-semibold mb-4">¿Estás seguro?</h3>
        <p className="mb-4">¿Quieres eliminar este chat?</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outlined" onClick={onCancel}>Cancelar</Button>
          <Button variant="primary" onClick={onConfirm}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteChatDialog;