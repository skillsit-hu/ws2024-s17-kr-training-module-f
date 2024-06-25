import { useState } from "react";
import logo from "../assets/hh-hotel-logo.png";
import { useEffect } from "react";
import { areDatesOverlapping } from "../lib/utils";

/**
 * Component for displaying the logo and the buttons
 */
const Header = ({
  onResetBtnClick,
  mainRef,
  onExportBtnClick,
  bookings,
  setBookings,
}) => {
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);

  /**
   * Chaning the fullscreen mode
   */
  useEffect(() => {
    function handleFullscreenChange() {
      setFullscreenEnabled(document.fullscreenElement !== null);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEN("fullscreenchange", handleFullscreenChange);
  }, []);

  /**
   * Function for toggling the fullscreen
   */
  function handleFullscreenToggle() {
    if (fullscreenEnabled) {
      document.exitFullscreen();
    } else {
      mainRef.current?.requestFullscreen();
    }
  }

  /**
   * Function for processing the uploaded file
   */
  async function handleFileUpload(file) {
    if (!file) return;

    // Read the file
    const fr = new FileReader();
    fr.readAsText(file);
    const result = await new Promise((res) => (fr.onload = res));
    const content = result.target.result;

    // Access the bookings
    const importedBookings = content
      .replace(/\\r/g, "")
      .split("\n")
      .slice(1)
      .map((line) => {
        const pieces = line.split(",");
        return { id: pieces[0], roomId: pieces[1] };
      });

    // Find the actual booking
    const importedAndFoundBookings = [];
    for (const b of bookings) {
      const imported = importedBookings.find((x) => x.id == b.id);
      if (!imported) continue;

      importedAndFoundBookings.push({ ...b, roomId: imported.roomId });
    }

    // Check whether two dates are overlapping or not
    let overlapping = false;
    for (const b of importedAndFoundBookings) {
      const bFrom = new Date(b.checkInDate);
      const bTo = new Date(b.checkOutDate);

      overlapping = importedAndFoundBookings
        .filter((x) => x.id !== b.id && x.roomId === b.roomId)
        .some((x) =>
          areDatesOverlapping(
            new Date(x.checkInDate),
            new Date(x.checkOutDate),
            bFrom,
            bTo
          )
        );

      if (overlapping) break;
    }

    // If overlapping, display an alert
    if (overlapping) {
      alert("This is an error! There is an overlapping booking!");
    } else {
      // TODO set bookings
      setBookings((prev) =>
        prev
          .map((booking) => {
            const foundBooking = importedAndFoundBookings.find(
              (x) => x.id == booking.id
            );
            return { ...(foundBooking || booking) };
          })
          .filter(Boolean)
      );
    }
  }

  return (
    <header>
      <img src={logo} alt="Logo" />

      <div className="row">
        <button className="btn" onClick={onExportBtnClick}>
          Export
        </button>

        <label className="btn" htmlFor="import-input">
          Import
        </label>
        <input
          type="file"
          id="import-input"
          accept="text/csv"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />

        <button className="btn" onClick={onResetBtnClick}>
          Reset
        </button>
        <button className="btn" onClick={handleFullscreenToggle}>
          {fullscreenEnabled ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      </div>
    </header>
  );
};

export default Header;
