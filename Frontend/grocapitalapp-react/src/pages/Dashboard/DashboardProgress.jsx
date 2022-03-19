import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { progressData } from "./util/progressData";
import FireworksIcon from '../../icons/fireworks.svg';

const DashboardProgress = () => {
  const [progressBarCompleted, setProgressBarCompleted] = useState(
    progressData[0] ? progressData[0].triggersAt : 0
  );
  const [currentContent, setCurrentContent] = useState(
    progressData[0] && progressData[0].content ? progressData[0].content : ""
  );
  const [currentIcon, setCurrentIcon] = useState(
    progressData[0] && progressData[0].icon ? progressData[0].icon : {}
  );
  const [currentProgressIndex, setCurrentProgressIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progressBarCompleted < 100) {
        if (currentProgressIndex === progressData.length - 1) {
          setProgressBarCompleted(progressBarCompleted + 10);
        } else {
          if (
            progressBarCompleted ===
            progressData[currentProgressIndex + 1].triggersAt
          ) {
            setCurrentIcon(progressData[currentProgressIndex + 1].icon);
            setCurrentContent(progressData[currentProgressIndex + 1].content);
            setCurrentProgressIndex(currentProgressIndex + 1);
          }
          setProgressBarCompleted(progressBarCompleted + 10);
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressBarCompleted]);

  const renderProgressCompletePopup = () => (
    <div className="popup active">
      <div className="popup__box">
        <div className="popup__item popup__item--sm">
          <div className="row flex-column align-items-center justify-content-center">
            <img src={FireworksIcon} alt="fireworks" />
            <p className="progress-complete-heading">Success!</p>
            <p className="progress-complete-description">
              Your request is in the progress. Please allow 24 hours.
            </p>
            <p className="notify-text">You'll be notified by email</p>
            <Link to="/dashboard" className="btn btn--green btn--full">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgressBarData = () => (
    <div id="dashboard-page white">
      <section className="dashboard">
        <div className="wrap positiion_centered">
          <div className="dashboard__content">
            <div className="row flex-column align-items-center justify-content-center">
              <img src={currentIcon} alt={currentContent} />
              <h1 className="heading_progress">{currentContent}</h1>
            </div>
            <div className="row flex-column align-items-center justify-content-center">
              <ProgressBar
                completed={progressBarCompleted}
                bgColor="#FFA200"
                width="300px"
                isLabelVisible={false}
                baseBgColor="#EDF5F5"
                labelColor="#e80909"
                className="progress-bar"
              />
            </div>
            <div className="row flex-column align-items-center justify-content-center">
              <p className="progress-subtitle">
                Please wait while we determine your "Gro's Investability Rate"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      {progressBarCompleted >= 100
        ? renderProgressCompletePopup()
        : renderProgressBarData()}
    </div>
  );
};

export default DashboardProgress;
