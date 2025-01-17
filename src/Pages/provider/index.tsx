import axios from "axios"
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import './index.scss'
interface ApiResponse {
    message: string;
    success: boolean;
    data: RoomData;
}

interface RoomData {
    id: string;
    room_url: string;
    room_name: string;
    provider_name: string;
    regular_provider: boolean;
    aichat: boolean;
    transcript: boolean;
    logo: string;
    top_header: boolean;
    auto_join: boolean;
    token: string;
    room_url_client: string;
    user_id: string;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
}
interface RoomConfig {
    provider_name: string;
    regular_provider: boolean;
    aichat: boolean;
    transcript: boolean;
    logo: string;
    top_header: boolean;
    auto_join: boolean;
}
const Provider = () => {

    const [roomCreated, setRoomCreated] = useState<boolean>(false);
    const [room, setRoom] = useState<RoomData | null>(null);
    const user = useSelector(
        (state: RootState) => state.reducer.user.user
    );

    const [roomConfig, setRoomConfig] = useState<RoomConfig>({
        provider_name: '',
        regular_provider: false,
        aichat: false,
        transcript: false,
        logo: '',
        top_header: false,
        auto_join: false
    });

    useEffect(() => {
        const checkRoomForProvider = async () => {
            try {
                const raw = {
                    room_name: user.username, // Request body as an object
                };

                const headers = {
                    'Content-Type': 'application/json', // Set Content-Type header
                };


                await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/get_room_details`,
                    raw, // Request body
                    { headers } // Headers
                ).then((response) => {
                    let roomData: RoomData = response.data.data
                    setRoom(roomData)
                    setRoomConfig({
                        provider_name: roomData.provider_name,
                        regular_provider: roomData.regular_provider,
                        aichat: roomData.aichat,
                        transcript: roomData.transcript,
                        logo: roomData.logo,
                        top_header: roomData.top_header,
                        auto_join: roomData.auto_join
                    })
                    console.log(response);
                }).catch((error: Error) => {
                    console.error('Error:', error.message); // Handle errors
                })

                // Log the response data

            } catch (error) {
                console.log(error)
            }
        }
        checkRoomForProvider()
    }, [])

    const createRoom = async () => {
        const raw = {
            room_name: user.username, // Pass the object directly; Axios handles JSON serialization.
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_APP_API_URL}`,
                raw,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ).then((response) => {
                setRoomCreated(true)
                console.log('room succesffully created', response.data)
            });

        } catch (error) {
            console.error(error);
        }
    }



    const setRoomConfigValues = (name: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        setRoomConfig({ ...roomConfig, [name]: name === 'logo' || name === 'provider_name' ? event.target.value : !roomConfig[name] })
    }

    return (
        <>
            {!roomCreated && (
                <div className="df w-100 aic g1">
                    <p>You are provider, but your room is not created. Click button to create one.</p>
                    <button className="btn btn-primary" onClick={createRoom}>Create room</button>
                </div>
            )}

            {room && (
                <table className="providerTable">
                    <tbody>
                        <tr>
                            <th>Room id:</th>
                            <td>{room.id}</td>
                        </tr>
                        <tr>
                            <th>Room url:</th>
                            <td>{room.room_url}</td>
                        </tr>
                        <tr>
                            <th>Room name:</th>
                            <td>{room.room_name}</td>
                        </tr>
                        <tr>
                            <th>Provider name:</th>
                            <td>
                                <label htmlFor="provider_name"> Provider name </label>
                                <input type="text" id="provider_name" name="provider_name" value={roomConfig?.provider_name}
                                    onChange={setRoomConfigValues('provider_name')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Regular provider:</th>
                            <td className="df aic">
                                <label htmlFor="regular_provider">Regular provider</label>
                                <input type="checkbox" id="regular_provider" name="regular_provider" checked={roomConfig?.regular_provider} onChange={setRoomConfigValues('regular_provider')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Aichat:</th>
                            <td className="df aic">
                                <label htmlFor="aichat">Aichat</label>
                                <input type="checkbox" id="aichat" name="aichat" checked={roomConfig?.aichat}
                                    onChange={setRoomConfigValues('aichat')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Transcript:</th>
                            <td className="df aic">
                                <label htmlFor="transcript">Transcript</label>
                                <input type="checkbox" id="transcript" name="transcript" checked={roomConfig?.transcript}
                                    onChange={setRoomConfigValues('transcript')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Logo:</th>
                            <td>
                                <label htmlFor="logo"> Logo </label>
                                <input type="text" id="logo" name="logo" value={roomConfig?.logo}
                                    onChange={setRoomConfigValues('logo')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Top header:</th>
                            <td className="df aic">
                                <label htmlFor="top_header"> Top header</label>
                                <input type="checkbox" id="top_header" name="top_header" checked={roomConfig?.top_header}
                                    onChange={setRoomConfigValues('top_header')} />
                            </td>
                        </tr>
                        <tr>
                            <th>Auto join:</th>
                            <td className="df aic">
                                <label htmlFor="auto_join">Auto join</label>
                                <input type="checkbox" id="auto_join" name="auto_join" checked={roomConfig?.auto_join}
                                    onChange={setRoomConfigValues('auto_join')} />

                            </td>
                        </tr>
                        <tr>
                            <th>Token:</th>
                            <td>{room.token}</td>
                        </tr>
                        <tr>
                            <th>Room url client:</th>
                            <td>{room.room_url_client}</td>
                        </tr>
                        <tr>
                            <th>User id:</th>
                            <td>{room.user_id}</td>
                        </tr>
                        <tr>
                            <th>Created at:</th>
                            <td>{room.createdAt}</td>
                        </tr>
                        <tr>
                            <th>Updated at:</th>
                            <td>{room.updatedAt}</td>
                        </tr>
                    </tbody>


                </table>
            )}
        </>
    )
}

export default Provider