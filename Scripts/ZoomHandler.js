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

namespace ZoomHandler
{
	const var MIN_ZOOM = 0.5;
	const var MAX_ZOOM = 2.0;
	const var ZOOM_STEP = 0.1;
	const var INTERFACE_WIDTH = 960;
	const var INTERFACE_HEIGHT = 540;

	const var ZoomPanel = Content.getComponent("zoomPanel");
	
	/*const var draggerData = [ 110,109,143,130,218,67,147,216,145,66,108,147,216,145,66,143,130,218,67,108,0,0,0,0,143,130,218,67,108,143,130,218,67,0,0,0,0,108,143,130,218,67,147,216,145,66,99,109,143,130,218,67,139,140,96,67,108,139,140,96,67,143,130,218,67,108,66,160,23,67,143,
	130,218,67,108,143,130,218,67,66,160,23,67,108,143,130,218,67,139,140,96,67,99,109,143,130,218,67,102,22,188,67,108,102,22,188,67,143,130,218,67,108,66,160,151,67,143,130,218,67,108,143,130,218,67,66,160,151,67,108,143,130,218,67,102,22,188,67,99,101,
	0,0 ];*/
	
	const var draggerData = "1102.t0F..VDQ5MtyCIF..VDQ1H5wCA0iBQz47E7Pt5tODcNeAOjXL3zNDcNeAODWcgCQG40wCwUW3Pjhe57PhwUW3PjyfW8PL3zND4hvaOjqt6CQtH71CIFTOJDQtH71CA.fEQTujX8P..XQDo23NOzXsYCC0Pjz+35PhYCC0Pzi9a5PFtgLD8RGgND454BQuzQnCIlPZqBQuzQnCIY5mPjeBc5PRl9IDI7ftNjXRl9IDUPw0NjPZqBQ1I1tCQtdtPjchs6PhY3FxPjchs6P1vPMDYQf0NjMLTCQR+iqCMVaYwMIDI8OtNjXYwMID8n+lNTpqGBQuzQnCgvRdPzKcD5PhYlpZPzKcD5P1l6EDAptlNjs4dAQjueqCIls4dAQnzSsCYlpZPjchs6PHrjGDYmX6NjXotdHDYmX6NTVbSBQVDXsCkE2jPjz+35Pi0lMLTCQrvYiCIlMLTCQnqkgCY3FxPDh4A3PjqmKDgXd.NjXBosJDgXd.NjjoeBQW6ogCIY5mPzFf23PhIY5mPjWgT4PBosJDAsuZND454BQP6qlCIlgaHCQP6qlCYCC0PDbcS4P1vPMDwBmMNzXsA.fEQjCv45PhA.fEQjxtb5PP8nPDwWBgNjqt6CQ7kPnCIFCNsCQ7kPnCwUW3PD2pa5Pb0ENDABKtNjXb0ENDMVa0NDCNsCQC6ztC4p69PzvNs6PhA0iBQzvNs6P..XQDIUr0ND..VDQN.mqCMVa..XQDU+9MNjX..XQDEqtFNDTOJDQhUIfC4p69PjXUB3PhwfS6PjXUB3Pb0ENDIrcFNDWcgCQFfaiCIFWcgCQJkOkCwfS6PjpZq4Pt5tODop1ZNjXP8nPDop1ZND..VDQ3zSkCA.fEQT8623Pi0F..VDQSDwVCIF..VDQL5HSCA0iBQj6CAzPt5tOD49P.MjXL3zND49P.MDWcgCQtZ.SCwUW3PjMIp0PhwUW3PTuKj1PL3zND0myzMjqt6CQ84LcCIFTOJDQ84LcCA.fEQjlSl1P..XQDMQDaMzXsIUDNPTBdu8PhQerQPTBdu8PjJJEDoKtUODohRAQ1cmyCIFohRAQxXywCQerQPTvXF7PREgCDELlAOjXvBmBDELlAOD..d.QOq2wCA.fGPTY657PhA.fGPz96W8PvBmBDkf2aOjTQ3.QI381CMVaHrjGDkf2aOjXotdHDkf2aOTVbSBQnxe0CkE2jPTY657PhkE2jPjH5c7PotdHDELlAODBK4AQAiYvCIlYppAQAiYvCYatWPjL1b7P1l6EDY2cNOjX1l6EDoKtUOjYppAQI381CgvRdPTBdu8Pi0FEE5BQI381CIlskHCQI381CYlE0PDp7W8PlYQMDU1tNOjXlYQMDIhdGOjskHCQAiYvCQQgtPTvXF7PhIG4pPTvXF7PBO+IDAguGOjvyeBQT8uyCIlvyeBQWBj0CIG4pPTBdu8PTTnKDkf2aOzXkA";
	
	
	const var draggerPath = Content.createPath();
	
	
	draggerPath.loadFromData(draggerData);
	
	ZoomPanel.setPaintRoutine(function(g)
	{
		g.setColour(Colours.withAlpha(Colours.white, (this.data.hover && this.data.allowDrag) ? 0.8 : 0.2));
		g.fillPath(draggerPath, [8, 8, 20, 20]);
	});
	
	inline function allowZoom(panel, on)
	{
		panel.data.allowDrag = on;
		panel.setMouseCursor(on ?"BottomRightCornerResizeCursor" : "NormalCursor", Colours.white, [0, 0]);
		panel.repaint();
	}
	
	allowZoom(ZoomPanel, true);
	
	ZoomPanel.setMouseCallback(function(event)
	{
		this.data.hover = event.hover;
		
		if(event.clicked)
		{
			this.data.zoomStart = Settings.getZoomLevel();
		}
		if(event.mouseUp)
		{
			return;
		}
	
		if(event.drag)
		{
			if(!this.data.allowDrag)
				return;
	
			var diagonal = Math.sqrt(INTERFACE_WIDTH*INTERFACE_WIDTH + INTERFACE_HEIGHT*INTERFACE_HEIGHT);
			var currentZoom = Settings.getZoomLevel();
			var dragPixel = 0;
			
			if(event.dragX > event.dragY)
				dragPixel = (event.dragX * currentZoom) / INTERFACE_WIDTH;
			else
				dragPixel = (event.dragY * currentZoom) / INTERFACE_HEIGHT;
			
			
			var maxScaleFactor = Content.getScreenBounds(false)[3] / INTERFACE_HEIGHT;
			var diagonalDrag = this.data.zoomStart + dragPixel;
			
			diagonalDrag += (ZOOM_STEP / 2);
			
			diagonalDrag = Math.min(diagonalDrag, maxScaleFactor);
			
			diagonalDrag -= Math.fmod(diagonalDrag, ZOOM_STEP);
			diagonalDrag = Math.range(diagonalDrag, MIN_ZOOM, MAX_ZOOM);
			
			var zoomToUse = diagonalDrag;
	
			if(currentZoom != zoomToUse)
			{
				Settings.setZoomLevel(zoomToUse);
			}
		}
		
		this.repaint();
	});
}