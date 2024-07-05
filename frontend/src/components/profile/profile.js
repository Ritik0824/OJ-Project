import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './profile.css'; // Import the CSS file
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { generateRandomData } from './utils';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [profileInfo, setProfileInfo] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/auth/getUser');
        if (response.data.status === 'Success' && Array.isArray(response.data.data.savedGetUser)) {
          setUser(response.data.data.savedGetUser);
        } else {
          console.error('Error fetching users:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchGoogleUser = async () => {
      try {
        const response = await Axios.get('http://localhost:8000/api/auth/getGoogleUser');
        if (response.data.status === 'Success' && response.data.data.savedGetUser) {
          setGoogleUser(response.data.data.savedGetUser);
        } else {
          console.error('Error fetching Google user:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Google user:', error);
      }
    };

    fetchUsers();
    fetchGoogleUser();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail && user && googleUser) {
      const currentUser = user.find((user) => user.email === storedEmail);
      const googleCurrentUser = googleUser.find((user) => user.email === storedEmail);

      if (currentUser) {
        setProfileInfo({
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
        });
      } else if (googleCurrentUser) {
        setProfileInfo({
          name: googleCurrentUser.name,
          email: googleCurrentUser.email,
          role: googleCurrentUser.role,
        });
      } else {
        console.error('Current user not found');
      }
    }
  }, [user, googleUser]);

  if (!profileInfo.email) {
    return <div>Loading...</div>;
  }

  const randomData = generateRandomData();

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://robohash.org/${profileInfo.name}.png?set=set4`}
            alt="Profile"
            className="profile-image"
          />
          <div className="profile-info">
            <h2 className="profile-name">
              {profileInfo.name} {profileInfo.role === 'admin' && <span className="admin-dot"></span>}
            </h2>
            <p className="profile-email">{profileInfo.email}</p>
            <p className="profile-role">{profileInfo.role}</p>
          </div>
        </div>
        <div className="heatmap-placeholder">
          <h3>Activity Heatmap</h3>
          <CalendarHeatmap
            startDate={new Date('2023-01-01')}
            endDate={new Date('2023-12-31')}
            values={randomData}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-github-${value.count}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
