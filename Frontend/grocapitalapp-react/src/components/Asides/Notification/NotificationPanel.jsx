import { useContext, useState } from "react";
import { AppControlContext } from "../../../context/AppControlContext";
import notifications from "./json/notifications.json";
import './NotificationPanel.scss'

const NotificationPanel = (props) => {
  const { notificationPanelState, setNotificationPanelState } = useContext(
    AppControlContext
  );
  const [removedNotifications, setRemovedNotifications] = useState([]);
  const [notificationsState, setNotificationsState] = useState(notifications);

  const notificationPanelStateHandler = () => {
    setNotificationPanelState(!notificationPanelState);
  };

  const handleDismissIssue = (id) => {
    setRemovedNotifications([
        ...removedNotifications,
        id
    ])

    const tempNotifications = notificationsState;
    const currentIndex = tempNotifications.findIndex(notification => notification.id === id)
    tempNotifications.splice(currentIndex, 1)
    setNotificationsState(tempNotifications)    
  };

  return (
    <aside
      id="sidebar-notifications"
      className={`${props.activeState ? "sidebar active" : "sidebar"}`}
    >
      <div className="sidebar__title">
        <h2>Notifications</h2>
        <div onClick={notificationPanelStateHandler} className="sidebar__close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
          >
            <g transform="translate(.414 .414)">
              <path d="M12.2928932,0.292893219 C12.6834175,-0.0976310729 13.3165825,-0.0976310729 13.7071068,0.292893219 C14.0675907,0.65337718 14.0953203,1.22060824 13.7902954,1.61289944 L13.7071068,1.70710678 L1.70710678,13.7071068 C1.31658249,14.0976311 0.683417511,14.0976311 0.292893219,13.7071068 C-0.0675907428,13.3466228 -0.0953202783,12.7793918 0.209704612,12.3871006 L0.292893219,12.2928932 L12.2928932,0.292893219 Z" />
              <path d="M0.292893219,0.292893219 C0.65337718,-0.0675907428 1.22060824,-0.0953202783 1.61289944,0.209704612 L1.70710678,0.292893219 L13.7071068,12.2928932 C14.0976311,12.6834175 14.0976311,13.3165825 13.7071068,13.7071068 C13.3466228,14.0675907 12.7793918,14.0953203 12.3871006,13.7902954 L12.2928932,13.7071068 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 Z" />
            </g>
          </svg>
        </div>
      </div>
      <div className="sidebar__notifications">
        {notificationsState.map((notification, index) => {
          return (
            <div key={notification.id} className={`sidebar__notification ${removedNotifications.includes(notification.id) ? 'hideNotification' : 'showNotification'}`}>
              <h3>
                {notification.notificationTitle}{": "}
                <span>{notification.notificationMessage}</span>
              </h3>
              <div className="sidebar__notification-controls">
                <span className="sidebar__notification-fix">Fix Issue</span>
                <span
                  className="sidebar__notification-remove"
                  onClick={() => handleDismissIssue(notification.id)}
                >
                  Dismiss
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default NotificationPanel;
