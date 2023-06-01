import { useState } from 'react';

const ChangePassword = () => {
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');

  const handleChangePw = async () => {
    const response = await fetch('/api/auth/changepassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accessToken: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({ oldPw: oldPw, newPw: newPw }),
    });
    const json = await response.json();
    alert(json.message);
    setNewPw('');
    setOldPw('');
  };
  return (
    <div>
      <input
        onChange={(e) => setOldPw(e.target.value)}
        type="password"
        placeholder="Old password..."
        value={oldPw}
      />
      <input
        onChange={(e) => setNewPw(e.target.value)}
        type="password"
        placeholder="New password..."
        value={newPw}
      />
      <button onClick={handleChangePw}>Save Changes</button>
    </div>
  );
};

export default ChangePassword;
