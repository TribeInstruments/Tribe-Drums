/*  ===========================================================================
*
*   This file is part of TRIBE DRUMS.
*   Copyright 2023 Jairo David Mendez Guzman
*
*   TRIBE DRUMS is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   TRIBE DRUMS is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with TRIBE DRUMS.  If not, see <http://www.gnu.org/licenses/>.
*
*   TRIBE DRUMS is based on the JUCE library using HISE Library,
*   which must be separately licensed for closed source applications:
*
*   http://www.juce.com
*
*   ===========================================================================
*/

namespace Theme
{
//Fonts



/*
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SugoRegular.ttf", "SugoRegular");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SugoLight.ttf", "SugoLight");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Poppins-Regular.ttf", "Poppins-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Poppins-Medium.ttf", "Poppins-Medium");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Poppins-SemiBold.ttf", "Poppins-SemiBold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Poppins-Bold.ttf", "Poppins-Bold");

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Thin.otf", "SF-Thin");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Light.otf", "SF-Light");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Regular.otf", "SF-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Medium.otf", "SF-Medium");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Semibold.otf", "SF-Semibold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/SF-Bold.otf", "SF-Bold");

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Avenir Next Condensed.ttf", "Avenir Next Condensed");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Copperplate.otf", "Copperplate");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Montserrat.ttf", "Montserrat");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/DISTRO.ttf", "Distro");

*/

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/futura.ttf", "Futura");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Thin.ttf", "InterTight-Thin");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Light.ttf", "InterTight-Light");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Regular.ttf", "InterTight-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Medium.ttf", "InterTight-Medium");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-SemiBold.ttf", "InterTight-SemiBold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Bold.ttf", "InterTight-Bold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-ExtraBold.ttf", "InterTight-ExtraBold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/InterTight-Black.ttf", "InterTight-Black");

Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Thin.ttf", "Gotham-Thin");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-XLight.ttf", "Gotham-Light");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Light.ttf", "Gotham-Regular");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Book.ttf", "Gotham-Medium");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Medium.ttf", "Gotham-SemiBold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Bold.ttf", "Gotham-Bold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Black.ttf", "Gotham-ExtraBold");
Engine.loadFontAs("{PROJECT_FOLDER}Fonts/Gotham-Ultra.ttf", "Gotham-Black");

//Font Sizes

var fontSize = 0;
var titleSize = 0;
var smallSize = 0;
var controlSize = 0;

//Font Names

/*const mainFont = "InterTight-SemiBold";
const mediumFont = "InterTight-Medium";
const lightFont = "InterTight-Light";
const thinFont = "InterTight-Thin";
const regularFont = "InterTight-Regular";
const boldFont = "InterTight-Bold";
const extraBoldFont = "InterTight-ExtraBold";
const blackFont = "InterTight-Black";*/

const mainFont = "Gotham-SemiBold";
const mediumFont = "Gotham-Medium";
const lightFont = "Gotham-Light";
const thinFont = "Gotham-Thin";
const regularFont = "Gotham-Regular";
const boldFont = "Gotham-Bold";
const extraBoldFont = "Gotham-ExtraBold";
const blackFont = "Gotham-Black";

const DarkColor = 0xFF1F1F1F;
const MidColor = 0xFF525252;
const LightColor = 0xFF707070;
const MainColor = 0xFFDFBF9A;
const SecondColor = 0xFFADBEB9;
const BrightColor = 0xBDFFFFFF;

const fontSize = Engine.getOS() == "WIN" ? 14 : 14;
const titleSize = Engine.getOS() == "WIN" ? 16 : 16;
const smallSize = Engine.getOS() == "WIN" ? 12 : 12;
const controlSize = Engine.getOS() == "WIN" ? 13 : 13;

//Popups

Content.setValuePopupData({
    "fontName":"InterTight-ExtraBold",
    "fontSize": fontSize,
    "borderSize": 0,
    "borderRadius": 6,
    "margin":3,
    "bgColour": 0xFF000000,
    "itemColour": 0xFFFFFFFF,
    "itemColour2": 0xFFECF2BA,
     "textColour": 0xFF252A35 
});


}