import React, { useState } from 'react';
import api from '../../api';

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('api/user-history/');
      setData(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Styling objects for an Apple-like clean UI
  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#f5f5f7',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontWeight: '600',
    color: '#333',
  };

  const sectionStyle = {
    marginBottom: '0.75rem',
    textAlign: 'justify',
    lineHeight: '1.5',
  };

  const scrollBoxStyle = {
    maxHeight: '150px',
    overflowY: 'auto',
    padding: '0.5rem',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#fafafa',
    textAlign: 'justify',
  };

  const metadataContainerStyle = {
    marginTop: '0.5rem',
  };

  const metadataItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.25rem 0',
    borderBottom: '1px solid #e0e0e0',
  };

  const keyStyle = {
    fontWeight: 'bold',
    color: '#007aff',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#007aff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#000', marginBottom: '1rem' }}>My History</h1>
      <button onClick={handleHistory} style={buttonStyle}>
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && data.length > 0 ? (
        data.map((record, index) => (
          <div key={index} style={cardStyle}>
            <div style={headerStyle}>
              <span>{record.type}</span>
              <span>{new Date(record.timestamp).toLocaleString()}</span>
            </div>
            <div style={sectionStyle}>
              <strong>Question:</strong> {record.question}
            </div>
            <div style={sectionStyle}>
              <strong>Transcription:</strong> {record.transcription}
            </div>
            <div style={sectionStyle}>
              <strong>AI Response:</strong>
              <div style={scrollBoxStyle}>
                {record.ai_response}
              </div>
            </div>
            {record.metadata && (
              <div style={sectionStyle}>
                <strong>Metadata:</strong>
                <div style={metadataContainerStyle}>
                  {Object.entries(record.metadata).map(([key, value], idx) => (
                    <div key={idx} style={metadataItemStyle}>
                      <span style={keyStyle}>{key}</span>
                      <span>{value.toString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        !loading && <p>No history available.</p>
      )}
    </div>
  );
};

export default History;
