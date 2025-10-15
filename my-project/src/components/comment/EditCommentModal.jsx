import React, { useState } from 'react';

const EditCommentModal = ({ open, initialText, onClose, onSave }) => {
  const [text, setText] = useState(initialText);

  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        padding: '24px',
        minWidth: '320px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)'
      }}>
        <h3>Edit Comment</h3>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          style={{ width: '100%', marginBottom: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{ marginRight: '8px', padding: '6px 12px', borderRadius: '4px', border: 'none', background: '#eee', color: '#333', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(text)}
            style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', background: '#7c3aed', color: '#fff', cursor: 'pointer' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;