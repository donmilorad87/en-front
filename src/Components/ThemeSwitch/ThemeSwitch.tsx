import { useThemeContext } from "../../theme";
import { Mode } from "../../types/theme";
import './ThemeSwitch.scss'

import { useDispatch } from "react-redux";
import {
    updateCustomTheme,
} from "../../store/reducer";
import { useState } from "react";


const ThemeSwitch = () => {
    const dispatch = useDispatch();
    const { changeMode } = useThemeContext();





    const toggleMode = (event: React.MouseEvent<HTMLElement>) => {

        switch (event.currentTarget.dataset.theme) {
            case "light":
                changeMode(Mode.Light)
                break;
            case "dark":
                changeMode(Mode.Dark)
                break;


        }

    };

    const openDialogSettings = () => {
        if (document.querySelector(".customThemeContainer")) {
            const dialogMenu: HTMLDialogElement | null = document.querySelector(".customThemeContainer");
            const dialogMenuCloseButton = document.querySelector(".close-dialog");
            if (dialogMenu && dialogMenuCloseButton) {



                dialogMenu.style.display = "flex";
                dialogMenu.showModal();

                dialogMenuCloseButton.addEventListener('click', () => {
                    dialogMenu.classList.add("dialog-menu--closing");
                    dialogMenu.close();
                    dialogMenu.style.display = "none";
                    dialogMenu.classList.remove("dialog-menu--closing");

                });
            }
        }

    };

    const setCustomTheme = () => {
        changeMode(Mode.Custom)
    }

    const customThemeObject = {
        colors: {
            background: 'red',
            tabBackground: 'red',
            containerHistoryBackground: 'red',
            carouselBackground: 'red',
            text: "white",
            primary: "white",
            bodyText: 'red',
            border: '1px solid white',
            languageContainerOutline: '1px solid white',
            dropCapPColor: 'white',
            dropCapPDecoraterColor: 'white'
        }
    }
    const [background, setBackground] = useState('');
    const handleThemeBackgroundChange = (event: React.FormEvent<HTMLInputElement>) => {
        setBackground(event.currentTarget.value);
        customThemeObject.colors.background = event.currentTarget.value;
        dispatch(updateCustomTheme(customThemeObject));

        changeMode(Mode.Custom)
    }

    return (
        <>
            <div>
                <button onClick={toggleMode} data-theme="light">Toggle Mode</button>
                <button onClick={toggleMode} data-theme="dark">Toggle Mode</button>
                <button onClick={openDialogSettings}>Settings</button>
            </div>
            <dialog id="customThemeContainer" className="customThemeContainer">
                <button className="close-dialog">Close Dialog</button>

                <div>
                    <input type="color" id="head" name="head" value={background} onChange={handleThemeBackgroundChange} />
                    <label htmlFor="head">Head</label>
                </div>

                <button onClick={setCustomTheme}> setCustom theme</button>
            </dialog>
        </>

    );
};

export default ThemeSwitch;
