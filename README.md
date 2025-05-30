# Spatial Web Audio Broadcaster

A simple web application demonstrating real-time audio broadcasting from an orchestrator (ORC) client to multiple source (SRC) clients using WebSockets and the Web Audio API.

## Features

*   **Real-time Communication**: Uses WebSockets for low-latency message passing between clients and the server.
*   **Client Registration**: SRC clients register with the server, and the ORC client can see a list of connected SRCs.
*   **Audio Broadcasting**: The ORC client can trigger audio playback (a C4 note) on selected SRC clients.
*   **Web Audio API**: SRC clients use the Web Audio API to generate and play tones.
*   **Mobile Friendly**: Includes considerations for Web Audio API on mobile devices (user gesture for audio initialization).

## Technologies Used

*   **Backend**: Node.js, Express.js, ws (WebSocket library)
*   **Frontend**: HTML, JavaScript, Web Audio API
*   **Communication Protocol**: WebSockets

## File Structure

```
.
├── public/
│   ├── index.html      # Basic landing page
│   ├── orc.html        # Orchestrator client UI
│   └── src.html        # Source (audio playback) client UI
├── server.js           # Node.js WebSocket server
└── README.md           # This file
```

## How to Run

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm) installed on your system.

### 1. Start the Server

Open your terminal, navigate to the project's root directory, and run:

```bash
node server.js
```

You should see a confirmation message: `Server running on http://0.0.0.0:3000`

### 2. Open the Clients

*   **ORC (Orchestrator) Client**:
    Open a web browser and navigate to `http://localhost:3000/orc.html`

*   **SRC (Source/Audio) Client(s)**:
    Open one or more web browser tabs/windows (or use different devices on the same network) and navigate to `http://localhost:3000/src.html`

### 3. Using the Application

1.  **SRC Client(s)**:
    *   Upon loading `src.html`, you should see a status of "Connecting..." and then "Connected".
    *   An "Enable Audio" button will be visible. **Click this button first** to initialize the Web Audio API (this is especially important on mobile devices).
    *   A "Test Tone" button will appear. You can use this to verify local audio playback on the SRC client.

2.  **ORC Client**:
    *   The `orc.html` page will display a list of connected SRC clients (e.g., "src-xxxxx").
    *   Clicking on an SRC client ID in the list will send a signal to that specific SRC client to play a C4 note.

3.  **SRC Client(s) (Playback)**:
    *   When the ORC client triggers a note for a specific SRC, that SRC client should play a C4 sound.
    *   The on-screen debug information on the SRC client will show the last note received, the count of notes, and audio status.

## Notes for Mobile Devices

*   **User Interaction for Audio**: Mobile browsers require a user gesture (like a button click) to start or resume the Web Audio API. The "Enable Audio" button on the SRC client serves this purpose.
*   **Silent Mode & Volume**: Ensure your mobile device is not in silent/vibrate mode and that the media volume is turned up.
