import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TimerView = ({ fd, ft, id }) => {
  TimerView.propTypes = {
    fd: PropTypes.string.isRequired,
    ft: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  let finalDate = new Date(new Date(fd).getTime() - 24 * 60 * 60 * 1000);
  let finalTime = ft.split(":");

  finalDate.setHours(finalTime[0]);
  finalDate.setMinutes(finalTime[1]);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(async () => {
      const remaining = getTimeRemaining();
      setTimeRemaining(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(timer);
        let res = await fetch(`/api/post/updateState/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post: id, status: "finished" }),
        });

        if (res.data) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeRemaining() {
    const difference = new Date(finalDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  return (
    <div>
      <p>{`${timeRemaining.days} Days ${timeRemaining.hours} : ${timeRemaining.minutes} : ${timeRemaining.seconds} remaining`}</p>
    </div>
  );
};

export default TimerView;
