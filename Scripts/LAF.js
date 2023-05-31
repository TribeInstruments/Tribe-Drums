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

namespace LAF
{
//LAFDefinitions

//Paths

//LAF Objects

const laf = Engine.createGlobalScriptLookAndFeel();
const customLaf = Content.createLocalLookAndFeel();
const headerButton = Content.createLocalLookAndFeel();

const ComboLaf = Content.createLocalLookAndFeel();
const ZoomComboLaf = Content.createLocalLookAndFeel();
const SliderLaf = Content.createLocalLookAndFeel();
const ReductionLaf = Content.createLocalLookAndFeel();
const viewportLaf = Content.createLocalLookAndFeel();

//Viewport

viewportLaf.registerFunction("drawTableRowBackground", function(g, obj)
{
	var a = obj.area;
	 
	//g.setColour(Colours.withAlpha(Colours.whitesmoke, 0.04));
	//g.fillRect([a[0], a[3] - 1, a[2], 1]);
	
	if(obj.selected)
	{	
		g.setColour(Colours.withAlpha(Colours.whitesmoke, 0.05));
		g.fillRoundedRectangle([a[0] + 2, a[1] + 4, a[2] - 4, a[3] - 8], 10);

	}
	
	if(obj.rowIndex % 2 != 0)
	{
		g.fillAll(Colours.withAlpha(Colours.black, 0.1));
	}

});

viewportLaf.registerFunction("drawTableHeaderBackground", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(Colours.withAlpha(Theme.DarkColor, 0.5));
	g.fillRoundedRectangle(a, 4);
	
	
});

viewportLaf.registerFunction("drawTableHeaderColumn", function(g, obj)
{
	var a = obj.area;

	g.setFont(Theme.boldFont, Theme.controlSize);
	g.setColour(Theme.BrightColor);
	g.drawAlignedText(obj.text, a, "centred");
	
});

viewportLaf.registerFunction("drawTableCell", function(g, obj)
{	
	var a = obj.area;
	
	g.setFont(Theme.mediumFont, Theme.smallSize);
	g.setColour(Theme.BrightColor);
	g.drawAlignedText(obj.text, a, "centred");

});

viewportLaf.registerFunction("drawToggleButton", function(g, obj)
{
	var a = obj.area;
	g.setColour(Theme.BrightColor);
	
	if (obj.over)
		g.setColour(Theme.MainColor);
	
	if(obj.text == "play")
	{
		g.fillPath(Paths.icons.start, [a[3] / 3, a[3] / 3, a[3] / 3, a[3] / 3]);
	}
	else if(obj.text == "stop")
	{
		g.fillPath(Paths.icons.stop, [0, a[3] / 3, a[3] / 3, a[3] / 3]);
	}
	
	
	
});

//Load Images

laf.loadImage("{PROJECT_FOLDER}KnobShadow.png", "KnobShadow");
customLaf.loadImage("{PROJECT_FOLDER}KnobShadow.png", "KnobShadow");
loadExpansionIcon(laf);

//Filter Handle

laf.registerFunction("drawFilterDragHandle", function(g, obj)
{
	var a = obj.handle;

	g.setColour(Colours.withAlpha(Theme.SecondColor, obj.hover ? 1.0 : 0.7));
	g.drawEllipse([a[0] + 5, a[1] + 5, a[2] - 10, a[3] - 10], 1);
	g.setFont(Theme.mediumFont, Theme.smallSize);	
	g.drawAlignedText(obj.index, a, "centred");		
	
});

//Global Rotary Sliders

customLaf.registerFunction("drawRotarySlider", function(g, obj)
{
	var a = obj.area;
	var thick = 3;
	var thick2 = 2;
	var thick3 = 6.5;
	
	if (obj.text.indexOf("big") != -1)
	{
		g.setColour(obj.itemColour1);
		g.drawEllipse([10, 10, a[2] - 20, a[3] - 20], thick);
		
		//g.setColour(obj.textColour);
		//g.fillEllipse([4, 8, a[2] - 8, a[3] - 8]);
		
		g.drawImage("KnobShadow", a, 0, 0);

		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
				
		g.setColour(obj.itemColour1);
		g.drawEllipse([4, 4, a[2] - 8, a[3] - 8], thick / 3);
		
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
		
		g.rotate(end, [a[2] / 2, a[3] / 2]);
		
		g.setColour(obj.itemColour2);
		g.fillRoundedRectangle([a[2] / 2 - thick / 2, 9, thick, a[3] / 4], 2);
				
	}
	else if (obj.text.indexOf("small") != -1)
	{
		//g.setColour(obj.textColour);
		//g.fillEllipse([4, 8, a[2] - 8, a[3] - 8]);
		
		g.drawImage("KnobShadow", a, 0, 0);

		g.setColour(Theme.DarkColor);
		g.fillEllipse([5, 5, a[2] - 10, a[3] - 10]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 1);
											
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillRoundedRectangle([a[2] / 2 - thick2 / 2, 6, thick2, a[3] / 3 - 1], 1);
					
	}
	else if (obj.text.indexOf("pin") != -1)
	{
		//g.setColour(obj.textColour);
		//g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		
		g.drawImage("KnobShadow", a, 0, 0);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([5, 5, a[2] - 10, a[3] - 10]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 2);
									
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 7, thick3, thick3]);
					
	}
	else if (obj.text.indexOf("pon") != -1)
	{
		g.drawImage("KnobShadow", a, 0, 0);

		g.setColour(Colours.withAlpha(obj.itemColour1, 0.15));
		g.drawEllipse([4, 4, a[2] - 8, a[3] - 8], thick / 3);
		
		//g.setColour(obj.textColour);
		//g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);

		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);

		g.setColour(obj.itemColour1);
		g.drawEllipse([8, 8, a[2] - 16, a[3] - 16], 3);
		
		g.setGradientFill([0x000000, 0, a[3] / 2, Colours.withAlpha(Colours.black, 0.6), a[3] / 2, a[3]]);
		g.fillEllipse([9, 9, a[2] - 18, a[3] - 18]);
									
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 8, 8]);
					
	}
	else if (obj.text.indexOf("pun") != -1)
	{
		g.drawImage("KnobShadow", a, 0, 0);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.15));
		g.drawEllipse([4, 4, a[2] - 8, a[3] - 8], thick / 3);
		
		//g.setColour(obj.textColour);
		//g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([9, 9, a[2] - 18, a[3] - 18]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([8, 8, a[2] - 16, a[3] - 16], 3);
		
		g.setGradientFill([0x000000, 0, a[3] / 2, Colours.withAlpha(Colours.black, 0.6), a[3] / 2, a[3]]);
		g.fillEllipse([8, 8, a[2] - 16, a[3] - 16]);
									
		var start = 2;
		var end = start * 2 * obj.valueNormalized - start;
			
		g.rotate(end, [a[2] / 2, a[3] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 5, 5]);
					
	}
	else if (obj.text.indexOf("macro") != -1)
	{
		var K = Content.createPath();
		var p1 = Content.createPath();
		var range = obj.max - obj.min;
		    
		var startOffset = 2.5;
		var arcThickness = 0.07;
		var arcWidth = 1.0 - 2.0 * arcThickness;
		      
		p1.clear();
		
		var endOffset = -startOffset + 2.0 * startOffset * obj.valueNormalized;
		    
		var val = "";
		
		var a = obj.area;
		var w = obj.area;
		var round = 2;
		var h = a[3];
   
		g.setColour(obj.bgColour);
		p1.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], - startOffset , 2.5);
       
		var pathArea = p1.getBounds(obj.area[2]);
      
		g.setColour(Colours.withAlpha(Colours.black, 0.4));
		g.drawPath(p1, pathArea, obj.area[2] * arcThickness);
  
		K.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], -startOffset - 0.08 , endOffset);   
   
		var pathArea = K.getBounds(obj.area[2]);

		g.setColour(Colours.withAlpha(Theme.MainColor, 0.8));
		g.drawPath(K, pathArea, obj.area[2] * arcThickness );
   
		if (obj.hover || obj.clicked)
		{
		
		    g.setColour(Theme.MainColor);	
		    g.drawPath(K, pathArea, obj.area[2] * arcThickness );
		
		}
		 
		/*g.beginLayer(false);    
		g.setColour(obj.textColour);
		g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		g.gaussianBlur(2);
		g.endLayer();*/
		
		g.setColour(obj.textColour);
		g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 2);
		
		g.drawImage("KnobShadow", a, 0, 0);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), 0, a[3] / 2, 0x000000, a[3] / 2, a[3]]);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([7, 7, a[2] - 14, a[3] - 14], 3);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.5));
		g.drawEllipse([7.5, 7.5, a[2] - 15, a[3] - 15], thick / 3);
									
		var start = 2;
		var end = startOffset * 2 * obj.valueNormalized - startOffset;

		g.rotate(end, [obj.area[2] / 2, obj.area[2] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 6, 6]);
					
	}
	else if (obj.text.indexOf("backwards") != -1)
	{
		var K = Content.createPath();
		var p1 = Content.createPath();
		var range = obj.max - obj.min;
		    
		var startOffset = 2.5;
		var arcThickness = 0.07;
		var arcWidth = 1.0 - 2.0 * arcThickness;
		      
		p1.clear();
		
		var endOffset = -startOffset + 2.0 * startOffset * obj.valueNormalized;
		    
		var val = "";
		
		var a = obj.area;
		var w = obj.area;
		var round = 2;
		var h = a[3];
 
		g.setColour(obj.bgColour);
		p1.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], -startOffset , 2.5);
      
		var pathArea = p1.getBounds(obj.area[2]);
      
		g.setColour(Colours.withAlpha(Colours.black, 0.4));
		g.drawPath(p1, pathArea, obj.area[2] * arcThickness);
    
		K.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], startOffset - 0.08 , endOffset);   
    
		var pathArea = K.getBounds(obj.area[2]);

		g.setColour(Colours.withAlpha(Theme.MainColor, 0.8));
		g.drawPath(K, pathArea, obj.area[2] * arcThickness );
   
		if (obj.hover || obj.clicked)
		{
		
		    g.setColour(Theme.MainColor);	
		    g.drawPath(K, pathArea, obj.area[2] * arcThickness );
		
		}
		    
		/*g.beginLayer(false);    
		g.setColour(obj.textColour);
		g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		g.gaussianBlur(2);
		g.endLayer();*/
		
		g.setColour(obj.textColour);
		g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 2);
		
		g.drawImage("KnobShadow", a, 0, 0);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), 0, a[3] / 2, 0x000000, a[3] / 2, a[3]]);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([7, 7, a[2] - 14, a[3] - 14], 3);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.5));
		g.drawEllipse([7.5, 7.5, a[2] - 15, a[3] - 15], thick / 3);
									
		var start = 2;
		var end = startOffset * 2 * obj.valueNormalized - startOffset;

		g.rotate(end, [obj.area[2] / 2, obj.area[2] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 6, 6]);
					
	}
	else if (obj.text.indexOf("pan") != -1)
	{
		var K = Content.createPath();
		var p1 = Content.createPath();
		var range = obj.max - obj.min;
		    
		var startOffset = 2.5;
		var arcThickness = 0.07;
		var arcWidth = 1.0 - 2.0 * arcThickness;
		      
		p1.clear();
		
		var endOffset = -startOffset + 2.0 * startOffset * obj.valueNormalized;
		    
		var val = "";
		
		var a = obj.area;
		var w = obj.area;
		var round = 2;
		var h = a[3];
   
		g.setColour(obj.bgColour);
		p1.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], -startOffset , 2.5);
       
		var pathArea = p1.getBounds(obj.area[2]);
       
		g.setColour(Colours.withAlpha(Colours.black, 0.4));
		g.drawPath(p1, pathArea, obj.area[2] * arcThickness);
    
		K.addArc([arcThickness / 2, arcThickness / 2, arcWidth + arcThickness, arcWidth + arcThickness], 0 + 0.08 , endOffset);   
			    
		var pathArea = K.getBounds(obj.area[2]);

		g.setColour(Colours.withAlpha(Theme.MainColor, 0.8));
		g.drawPath(K, pathArea, obj.area[2] * arcThickness );
   
		if (obj.hover || obj.clicked)
		{
		
		    g.setColour(Theme.MainColor);	
		    g.drawPath(K, pathArea, obj.area[2] * arcThickness );
		
		}
		    
		/*g.beginLayer(false);    
		g.setColour(obj.textColour);
		g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
		g.gaussianBlur(2);
		g.endLayer();*/
		
		g.setColour(obj.textColour);
		g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 2);
		
		g.drawImage("KnobShadow", a, 0, 0);
		
		g.setColour(obj.bgColour);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), 0, a[3] / 2, 0x000000, a[3] / 2, a[3]]);
		g.fillEllipse([10, 10, a[2] - 20, a[3] - 20]);
		
		g.setColour(obj.itemColour1);
		g.drawEllipse([7, 7, a[2] - 14, a[3] - 14], 3);
		
		g.setColour(Colours.withAlpha(obj.itemColour1, 0.5));
		g.drawEllipse([7.5, 7.5, a[2] - 15, a[3] - 15], thick / 3);
									
		var start = 2;
		var end = startOffset * 2 * obj.valueNormalized - startOffset;

		g.rotate(end, [obj.area[2] / 2, obj.area[2] / 2]);
			
		g.setColour(obj.itemColour2);
		g.fillEllipse([a[2] / 2 - thick3 / 2, 12, 6, 6]);
					
	}

});

customLaf.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(Theme.DarkColor);
	g.fillRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 7);
	
	//g.setColour(obj.textColour);
	//g.drawRoundedRectangle([a[0] + 1, a[1] + 1, a[2] - 2, a[3] - 2], 8, 0.5);
	
	if (obj.style == 2)
	{
		
		var w = 6;
		var x = a[2] * obj.valueNormalized - (a[3]) * obj.valueNormalized + 4;
		
		//g.setColour(obj.itemColour2);
		//g.fillRoundedRectangle([x, 5, w + 4, a[3] - 8], 4);
		
		//g.setColour(obj.itemColour1);
		//g.fillRoundedRectangle([x, 4, w, a[3] - 8], 2);
		
		g.setColour(obj.itemColour1);
		//g.fillEllipse([x, 4, a[3] - 8, a[3] - 8]);
		g.drawEllipse([x, 4, a[3] - 8, a[3] - 8], 2.5);
		
		
				
	}
	
	else if (obj.style == 3)
	{
		
		var h = 6;
		var y = a[3] - a[3] * obj.valueNormalized - (a[2] - 4) + (a[2] + 1) * obj.valueNormalized;
		
		//g.setColour(obj.itemColour2);
		//g.fillRoundedRectangle([4, y, a[2] - 6, h + 4], 4);
		
		
		
		g.setColour(obj.itemColour1);
		//g.fillEllipse([4, y, a[2] - 8, a[2] - 8]);
		g.drawEllipse([4, y, a[2] - 8, a[2] - 8], 2.5);
		
		g.drawImage("KnobShadow", [2, y, a[2] - 4, a[2] - 4], 0, 0);

	}
	
});

customLaf.registerFunction("drawSliderPackFlashOverlay", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(obj.bgColour);
	g.fillRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 5);
	
	g.setColour(obj.itemColour2);
	g.drawRoundedRectangle([a[0] + 1, a[1] + 1, a[2] - 2, a[3] - 2], 6, 1);
});

customLaf.registerFunction("drawSliderPackBackground", function(g, obj)
{
	
});

// Buttons

//HeaderButtons

headerButton.registerFunction("drawToggleButton", function(g, obj)
{
	var a = obj.area;

	if (obj.text.indexOf("right") != -1)
	{
		var icon = obj.text.replace("right-");
		
		g.setColour(0xFF1F2125);
		g.fillRect([a[2] - 1, 0, 1, a[3]]);
		g.fillRect([0, 0, 1, a[3]]);
		
		g.setColour(obj.value == 1 ? obj.bgColour : 0x000000);
		g.fillRoundedRectangle([2, a[3] - 3, a[2] - 4, 2], 1);
		
		g.setColour(obj.over == 1 ? obj.itemColour1 : obj.bgColour);
		g.fillPath(Paths.icons[icon], [a[0] + 12, a[1] + 12, a[2] - 24, a[3] - 24]);
			
	}
	else if (obj.text.indexOf("left") != -1)
	{
		var icon = obj.text.replace("left-");
		
		g.setColour(0xFF1F2125);
		g.fillRect([0, 0, 1, a[3]]);
		
		g.setColour(obj.value == 1 ? obj.bgColour : 0x000000);
		g.fillRoundedRectangle([2, a[3] - 3, a[2] - 4, 2], 1);
		
		g.setColour(obj.over == 1 ? obj.itemColour1 : obj.bgColour);
		g.fillPath(Paths.icons[icon], [a[0] + 12, a[1] + 12, a[2] - 24, a[3] - 24]);
		
	}
	
});

customLaf.registerFunction("drawToggleButton", function(g, obj)
{
	var a = obj.area;
	
	var gradient2 = [Colours.withAlpha(Theme.BrightColor, 0.3), 0, 0, Colours.withAlpha(Colours.black, 0.3), 0, a[3] / 1.1];
	
	if (obj.text.indexOf("icon") != -1)
	{
		var icon = obj.text.replace("icon-");
		
		g.setColour(Colours.withAlpha(Colours.black, 0.05));
		g.fillPath(Paths.icons[icon], [a[0], a[1], a[2], a[3]]);
		
		if 	(obj.value == 1)
		{ 
		g.setColour(obj.itemColour1);
		}
		else if (obj.value == 0)
		{ 
		g.setColour(obj.bgColour);
		}
		
		if (obj.over)
			g.setColour(obj.itemColour2);

		
		g.fillPath(Paths.icons[icon], [a[0], a[1], a[2] - 2, a[3] - 2]);
		
	}
	else if (obj.text.indexOf("toggle") != -1)
	{
		var icon = obj.text.replace("toggle-");
		
		if 	(obj.value == 1)
		{
		
		g.setColour(Colours.withAlpha(Colours.black, 0.4));
		g.fillPath(Paths.icons.on, a);	
		 
		g.setColour(obj.itemColour1);
		g.fillPath(Paths.icons.on, [0, 0, a[2] - 2, a[3] - 2]);
		}
		else if (obj.value == 0)
		{
		
		g.setColour(Colours.withAlpha(Colours.black, 0.4));
		g.fillPath(Paths.icons.off, a);	
		 
		g.setColour(obj.bgColour);
		g.fillPath(Paths.icons.off, [0, 0, a[2] - 2, a[3] - 2]);
		

		}
		
		if (obj.over)
			g.setColour(obj.itemColour2);
	
	}
	else if (obj.text.indexOf("inverted") != -1)
	{
		var icon = obj.text.replace("inverted-");
		
		if 	(obj.value == 1)
		{ 
		g.setColour(obj.itemColour1);
		g.fillPath(Paths.icons.off, a);
		}
		else if (obj.value == 0)
		{ 
		g.setColour(obj.bgColour);
		g.fillPath(Paths.icons.on, a);
		
		}
		
		if (obj.over)
			g.setColour(obj.itemColour2);
	
	}
	else if (obj.text.indexOf("text-") != -1)
		{
			var text = obj.text.replace("text-");
			
			if (obj.value == 0)
			{
				g.setColour(obj.bgColour);
				g.fillRoundedRectangle(obj.area, 10);
					
			}
			else if (obj.value == 1)
			{
				g.setColour(obj.itemColour1);
				g.fillRoundedRectangle(obj.area, 10);
				
			}
			
			if (obj.over)
			{
				g.setColour(obj.itemColour2);
				g.fillRoundedRectangle(obj.area, 9);
			}
			
			g.setColour(obj.textColour);
			g.setFont(Theme.boldFont, Theme.fontSize);
			g.drawAlignedText(text, a, "centred");

		}
	else if (obj.text.indexOf("preset-") != -1)
		{
			var text = obj.text.replace("preset-");
			var a = obj.area;
				
			g.setColour(obj.value ? Theme.MainColor : Colours.withAlpha(Colours.whitesmoke, 0.7));
				
			if (obj.over)
				g.setColour(Colours.whitesmoke);
			
			g.setFont(Theme.boldFont, Theme.fontSize);
			g.drawAlignedText(text, obj.area, "centred");

		}
	else if (obj.text.indexOf("textlined-") != -1)
		{
			var text = obj.text.replace("textlined-");
			
			g.setColour(Colours.black);
			g.setOpacity(0.1);
			g.fillRoundedRectangle([a[0] + 4, a[1] + 4, a[2] - 6, a[3] - 4], 8);
						
			if (obj.value == 0)
			{
				
			g.setColour(Theme.DarkColor);
			g.fillRoundedRectangle([a[0] + 4, a[1] + 3, a[2] - 8, a[3] - 7], 7);
				
			}
			else if (obj.value == 1)
			{
								
			g.setColour(obj.itemColour1);
			g.fillRoundedRectangle([a[0] + 4, a[1] + 3, a[2] - 8, a[3] - 7], 7);
				
			}
			
			if (obj.over)
			{
				
			g.setGradientFill([Colours.withAlpha(obj.itemColour2, 0.2), 0, 0, 0x00FFFFFF, a[3] / 2, a[3]]);
			g.fillRoundedRectangle([a[0] + 4, a[1] + 3, a[2] - 8, a[3] - 6], 8);
			
			}
			
			g.setColour(obj.textColour);
			g.setFont(Theme.mainFont, Theme.smallSize);
			g.drawAlignedText(text, a, "centred");
			
			g.setGradientFill(gradient2);
			g.drawRoundedRectangle([a[0] + 4, a[1] + 3, a[2] - 8, a[3] - 7], 8, 1);
			
		
		}
	else if (obj.text.indexOf("textlogo-") != -1)
			{
				var text = obj.text.replace("textlogo-");
				
				if (obj.value == 0)
				{
					g.setColour(obj.bgColour);
					g.setFont(Theme.mainFont, Theme.titleSize);
					g.drawAlignedText(text, a, "centred");
						
				}
				else if (obj.value == 1)
				{
					g.setColour(obj.itemColour1);
					g.setFont(Theme.mainFont, Theme.titleSize);
					g.drawAlignedText(text, a, "centred");
					
				}
				
				if (obj.over)
				{
					g.setColour(obj.itemColour2);
					g.setFont(Theme.mainFont, Theme.titleSize);
					g.drawAlignedText(text, a, "centred");
				}
	
			}
	else if (obj.text.indexOf("circle-") != -1)
			{
				var text = obj.text.replace("circle-");
				
				g.drawImage("KnobShadow", a, 0, 0);
							
				if (obj.value == 0)
				{
				
				//g.setColour(0x7F000000);
				//g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);
									
				g.setColour(obj.bgColour);
				g.fillEllipse([5, 5, a[2] - 10, a[3] - 10]);
					
				g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), 0, a[3] / 2, 0x000000, a[3] / 2, a[3]]);
				g.fillEllipse([7, 7, a[2] - 14, a[3] - 14]);
				
				g.setColour(obj.textColour);
				g.setOpacity(0.3);
				g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 1.5);
	
				}
				else if (obj.value == 1)
				{
				//g.setColour(0x7F000000);
				//g.fillEllipse([4, 7, a[2] - 8, a[3] - 8]);

				g.setColour(obj.itemColour1);
				g.fillEllipse([6, 6, a[2] - 12, a[3] - 12]);
					
				g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), 0, a[3] / 2, 0x000000, a[3] / 2, a[3]]);
				g.fillEllipse([7, 7, a[2] - 14, a[3] - 14]);
					
				g.setColour(obj.textColour);
				g.setOpacity(0.3);
				g.drawEllipse([5, 5, a[2] - 10, a[3] - 10], 1.5);
					
				}
				
				if (obj.over)
				{
				g.setColour(obj.itemColour2);
				g.fillEllipse([6, 6, a[2] - 12, a[3] - 12]);
				}
	
				g.setColour(obj.textColour);
				g.setFont(Theme.mainFont, Theme.smallSize - 1);
				g.drawAlignedText(text, a, "centred");
				
			
			}
		else if (obj.parentType == "MidiChannelList")
		{
			g.setColour(Colours.antiquewhite);
			g.setFont(Theme.mediumFont, Theme.controlSize);
			g.drawAlignedText(obj.text, [a[0] + 35, a[1], a[2], a[3]], "left");
			
			obj.value == 0 ? g.setColour(Theme.MidColor) : g.setColour(Theme.MainColor);
			
			g.fillEllipse([10, 5, 15, 15]);
		}
		else if (obj.parentType == "MidiSources")
		{
			g.setColour(Colours.antiquewhite);
			g.setFont(Theme.mediumFont, Theme.controlSize);
			g.drawAlignedText(obj.text, [a[0] + 35, a[1], a[2], a[3]], "left");
			
			obj.value == 0 ? g.setColour(Theme.MidColor) : g.setColour(Theme.MainColor);
			
			g.fillEllipse([10, 5, 15, 15]);
		}
});

// ComboBox

ZoomComboLaf.registerFunction("drawComboBox", function(g, obj)
{
  
});

ZoomComboLaf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.fillAll(Theme.MidColor);

});

ZoomComboLaf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isSeparator)
    {
        g.setColour(Colours.white);
        g.drawLine(a[0]+10, a[0] + a[2]-10, a[1] + a[3]/2, a[1] + a[3]/2, 1.0);
        return;
    }
    
    if(obj.isTicked)
    {
		g.setColour(Colours.white);
		g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
    }
    
    if(obj.isHighlighted)
    {
    	g.setColour(0x22FFFFFF);
    	g.fillRect(obj.area);
    }
    
    g.setFont(Theme.mainFont, Theme.fontSize);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

laf.registerFunction("drawComboBox", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(Theme.DarkColor);
	g.fillRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 8);

    //g.setColour(0x11FFFFFF);
    //g.drawRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 9, 1);
    
    g.setColour(0xAEFFFFFF);
    g.setFont(Theme.mediumFont, Theme.controlSize);
    g.drawAlignedText(obj.text, [a[0] + 10, a[1], a[2]-10, a[3]], "left");
    var h = a[3];
    
    g.setColour(0xAEFFFFFF);
    g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3 - 1, h/3 - 1], Math.PI);
    
    g.setColour(0x73000000);
    g.drawTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3 - 1, h/3 - 1], Math.PI, 1);
    
});

laf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.fillAll(Theme.MidColor);

});

laf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isSeparator)
    {
        g.setColour(Colours.white);
        g.drawLine(a[0]+10, a[0] + a[2]-10, a[1] + a[3]/2, a[1] + a[3]/2, 1.0);
        return;
    }
    
    if(obj.isTicked)
    {
		g.setColour(Colours.white);
		g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
    }
    
    if(obj.isHighlighted)
    {
        g.setColour(0x22FFFFFF);
        g.fillRect(obj.area);
    }
    
    g.setFont(Theme.mainFont, Theme.fontSize);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});


laf.registerFunction("drawAlertWindow", function(g, obj)
{
	var a = [0, 0, obj.area[2], 30];
	
	var gradient = [Theme.LightColor, 0, obj.area[3] / 2, Theme.MidColor, 0, obj.area[3] / 1];
	var gradient2 = [Colours.withAlpha(Theme.BrightColor, 0.1), 0, 0, Colours.withAlpha(Colours.black, 0.5), 0, obj.area[3] / 1.1];
	
	
	//g.setGradientFill(gradient);
	g.setColour(Theme.MidColor);
	g.fillRect(obj.area);
	
	g.setColour(Theme.DarkColor);
	g.fillRect(a);
	
	//g.setGradientFill(gradient2);
	//g.drawRoundedRectangle(obj.area, 15, 1);
	
	g.setGradientFill(gradient2);
	g.drawRect(obj.area, 0.5);
	
	g.setColour(Colours.whitesmoke);
	g.setFont(Theme.mainFont, Theme.fontSize);
	g.drawAlignedText(obj.title, a, "centred");
	
});

laf.registerFunction("getAlertWindowMarkdownStyleData", function(obj)
{
    obj.font = Theme.mainFont;
    obj.fontSize = Theme.titleSize;
    obj.headlineColour = Colours.whitesmoke;
    
    return obj;
});

laf.registerFunction("drawAlertWindowIcon", function(g, obj)
{
	var a = obj.area;
	var area = [a[0], a[1], a[2] - 10, a[2] - 10];
	
	g.setColour(Theme.LightColor);

    if(obj.type == "Question")
    {	
	    g.fillPath(Paths.icons.circlequestion, area);
    }
    
    else if(obj.type == "Info")
    {	
    	g.fillPath(Paths.icons.circleinfo, area);
    }
    
    else if(obj.type == "Warning")
    {	
        g.fillPath(Paths.icons.circlewarning, area);
    }
    
    else if(obj.type == "Error")
    {	
    	g.fillPath(Paths.icons.circlexmark, area);
    }

});

laf.registerFunction("drawWhiteNote", function(g, obj)
{
	var a = obj.area;
	var c = obj.keyColour;
	
	if (obj.down)
		{

			g.setColour(Colours.withAlpha(Theme.MainColor, 0.8));
			g.fillRoundedRectangle(a, 6);
			
			g.setColour(Colours.black);
			g.drawRoundedRectangle(a, 6, 2);
		
		}
	else if (obj.hover)
		{
		
			g.setColour(Colours.withAlpha(Theme.SecondColor, 0.5));
			g.fillRoundedRectangle(a, 6);
				
			g.setColour(Colours.black);
			g.drawRoundedRectangle(a, 6, 2);
		}
	else
		{
		
			g.setColour(c);
			g.fillRoundedRectangle(a, 6);
		
			g.setColour(Colours.black);
			g.drawRoundedRectangle(a, 6, 2);
		
		}
});

laf.registerFunction("drawBlackNote", function(g, obj)
{
	var a = obj.area;
	var c = obj.keyColour;
	
	if (obj.down)
		{

			g.setColour(Colours.black);
			g.fillRoundedRectangle(a, 6);
			
			g.setColour(Colours.withAlpha(Theme.MainColor, 0.8));
			g.fillRoundedRectangle(a, 6);
			
		}
	else if (obj.hover)
		{

			g.setColour(Colours.black);
			g.fillRoundedRectangle(a, 6);

			g.setColour(Colours.withAlpha(Theme.SecondColor, 0.5));
			g.fillRoundedRectangle(a, 6);
			
		}
	else
		{
		
			g.setColour(Colours.black);
			g.fillRoundedRectangle(a, 6);

		}

});

laf.registerFunction("drawTableBackground", function(g, obj)
{
	var a = obj.area;
	
	g.setGradientFill([Colours.withAlpha(Colours.black, 0.8), 0, a[3], Colours.withAlpha(Colours.black, 0.3), 0.8, 0, a[1]]);
	g.fillRoundedRectangle(a, 4);
	
	g.setColour(Colours.withAlpha(Colours.whitesmoke, 0.1));
	g.drawRoundedRectangle(a, 4, 1.5);
	
	g.drawDropShadow([a[0], a[1] / 2, a[2], 5], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([0, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([a[2] - 5, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.5), 5);
	
});

/*laf.registerFunction("drawAhdsrBackground", function(g, obj)
{
	var a = obj.area;
	
	g.setGradientFill([Colours.withAlpha(Colours.black, 0.8), 0, a[3], Colours.withAlpha(Colours.black, 0.3), 0.8, 0, a[1]]);
	g.fillRoundedRectangle(a, 4);
	
	g.setColour(0x0CFFFFFF);
	g.drawRoundedRectangle(a, 4, 1.5);
	
	g.drawDropShadow([a[0], a[1] / 2, a[2], 5], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([0, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([a[2] - 5, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.5), 5);
	
});*/

/*laf.registerFunction("drawFilterBackground", function(g, obj)
{
	var a = obj.area;
	
	g.setGradientFill([Colours.withAlpha(Colours.black, 0.8), 0, a[3], Colours.withAlpha(Colours.black, 0.3), 0.8, 0, a[1]]);
	g.fillRoundedRectangle(a, 4);
	
	g.setColour(Colours.withAlpha(Colours.whitesmoke, 0.2));
	g.drawRoundedRectangle(a, 4, 1.5);
	
	g.drawDropShadow([a[0], a[1] / 2, a[2], 5], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([0, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.3), 5);
	g.drawDropShadow([a[2] - 5, 0, 0, a[3]], Colours.withAlpha(Colours.black, 0.5), 5);
	
});*/

laf.registerFunction("drawTablePoint", function(g, obj)
{
	var a = obj.tablePoint;

    g.setColour(obj.itemColour);
    g.drawEllipse([a[0] + 3, a[1] + 3, a[2] - 6, a[3] - 6], 2.5);
    
    if(obj.hover)
    {
        g.setColour(Colours.withAlpha(Theme.MainColor, 0.6));
        g.fillEllipse([a[0] + 3, a[1] + 3, a[2] - 6, a[3] - 6]);
    }
});

laf.registerFunction("drawTablePath", function(g, obj)
{
	var a = obj.area;

    g.setColour(obj.itemColour2);
    g.drawPath(obj.path, obj.area, 2);
    
    var gradient = [obj.itemColour, 0, 0, obj.bgColour, 0, a[3]];
    
    g.setGradientFill(gradient);
    g.fillPath(obj.path, obj.area);
    
    g.drawDropShadow([a[2] - 2, 0, 0, a[3]], 0xFF191919, 10);
    g.drawDropShadow([0, a[3] - 2, a[2], 5], Colours.withAlpha(Colours.black, 0.7), 5);
    
});

laf.registerFunction("drawTableRuler", function(g, obj)
{
    g.setColour(Colours.withAlpha(obj.itemColour, 0.05));
    
    var x = obj.position * obj.area[2] - 4;
    var a = obj.area;
    
    g.fillRoundedRectangle([a[0] + 2, a[1] + 2, x, a[3] - 4], 4);
    
    g.setColour(Colours.withAlpha(obj.itemColour, 0.15));
    g.drawLine(x, x, 4, obj.area[3] - 3, 2.0);

});

// PRESET BROWSER

laf.registerFunction("drawPresetBrowserListItem", function(g, obj)
{
	var a = obj.area;
	var h = a[3];
	
	if (obj.columnIndex == -1)
	{	
		g.drawDropShadow([a[0] + 4, a[1] + 4, 211 - 8, a[3] - 12], Colours.withAlpha(Colours.black, 0.5), 5);
		g.setColour(Colours.withAlpha(Colours.white, obj.selected ? 1.0 : 0.6));
		g.drawImage(obj.text, [a[0] + 4, a[1] + 4, 211 - 8, a[3] - 12], 0, 0);

		if (obj.hover)
		{
			g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), a[0] , a[1], 0x000000, a[2], a[1]]);
			g.fillRoundedRectangle([a[0] + 4, a[1] + 4, a[2] - 8, a[3] - 14], 2);
		}
		if (obj.selected)
		{
			g.setColour(Colours.withAlpha(Theme.MainColor, 0.5));
			g.drawRoundedRectangle([a[0] + 1, a[1] + 1, 210, a[3] - 7], 1, 2);
			g.fillTriangle([4, a[3] / 2 - 7, 10, 15], Math.toRadians(90));
		}
		
	}
	else
	{
		if (obj.selected)
		{
			g.setGradientFill([Colours.withAlpha(Colours.black, 0.5), a[0] , a[1], 0x000000, a[2], a[1]]);
			g.fillRoundedRectangle([a[0] + 10, a[1], a[2], a[3]], 2);
			
			g.setColour(Theme.MainColor);
			g.fillRoundedRectangle([2, 2, 5, a[3] - 2], 2);
		}
		if (obj.hover)
		{
			g.setGradientFill([Colours.withAlpha(Colours.white, 0.2), a[0] , a[1], 0x000000, a[2], a[1]]);
			g.fillRoundedRectangle([a[0] + 10, a[1], a[2], a[3]], 2);
			
			g.setColour(Colours.withAlpha(Colours.white, 0.2));
			g.fillRoundedRectangle([2, 2, 5, a[3] - 2], 2);
		}
		
		g.setColour(Colours.withAlpha(Theme.MainColor, 0.4));
		g.fillRoundedRectangle([3, 3, 3, a[3] - 4], 2);
		
		g.setFont(Theme.mediumFont, Theme.titleSize - 1);
		g.setColour(Theme.BrightColor);
		g.drawAlignedText(obj.text, [a[0] + 20, a[1], a[2], a[3]], "left");
	}


});

laf.registerFunction("drawPresetBrowserColumnBackground", function(g, obj)
{	
	var a = obj.area;

	g.setColour(Colours.withAlpha(Colours.white, 0.05));
	g.fillRoundedRectangle([0, 2, 2, a[3]], 2);
	g.fillRoundedRectangle([5, 0, a[2], 2], 2);

});

laf.registerFunction("drawPresetBrowserSearchBar", function(g, obj)
{	
	var a = obj.area;
	
	g.setColour(Colours.withAlpha(Colours.white, 0.08));
	g.fillRoundedRectangle(a, 6);
	
	g.setColour(Colours.withAlpha(Colours.white, 0.5));
	g.fillPath(Paths.icons.search, [5, 5, 15, 15]);

});

inline function removeFromTop(area, amountToRemove)
{
    local a = [area[0], area[1], area[2], amountToRemove];
    
    area[1] += amountToRemove;
    area[2] -= amountToRemove;
    return a;
}

laf.registerFunction("drawPresetBrowserDialog", function(g, obj)
{
	var a = obj.area;

   //g.fillAll(MidColor) ;
   g.setColour(Theme.MidColor);
   g.fillRoundedRectangle([a[0], a[1], a[2], a[3] + 20], 5.0);
   
   g.setColour(Theme.DarkColor);
   g.fillRoundedRectangle(obj.labelArea, 5.0);
   
   g.setFont(Theme.mediumFont, Theme.titleSize);
   g.setColour(Theme.BrightColor);
   g.drawAlignedText(obj.title, removeFromTop(obj.area, 50), "centred");
   //g.drawAlignedText(obj.text, removeFromTop(obj.area, 10), "centred");
    
});


SliderLaf.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	
	g.setGradientFill([obj.itemColour1, 0, a[3] / 2, obj.itemColour2, 0, a[3]]);
	var h = 6;
	var y = a[3] - a[3] * obj.valueNormalized;
	g.fillRoundedRectangle([1, y, a[2] - 2, a[3]], 3);
	
	g.setGradientFill([obj.bgColour, 0, a[3] / 2, 0x000000, 0, a[3]]);
	var h = 6;
	var y = a[3] - a[3] * obj.valueNormalized;
	g.fillTriangle([0, y, a[2] - 2, a[3]], 9);

});

SliderLaf.registerFunction("drawSliderPackFlashOverlay", function(g, obj)
{
	var a = obj.area;
	
	g.setGradientFill([0x000000, 0, a[3] / 2, obj.textColour, 0, a[3]]);
	g.fillRoundedRectangle([a[0] + 1, obj.valueNormalized, a[2] - 2, a[3]], 2);

});

SliderLaf.registerFunction("drawSliderPackBackground", function(g, obj)
{
	
});

SliderLaf.registerFunction("drawSliderPackTextPopup", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(Colours.withAlpha(Theme.DarkColor, 0.6));
	g.fillRoundedRectangle([0, a[3] - 18, 50, 18], 2);

	
	g.setColour(Colours.withAlpha(Colours.whitesmoke, 0.5));
	g.setFont(Theme.mediumFont, Theme.controlSize);
	g.drawAlignedText(obj.text, a, "bottomLeft");
	
});

ComboLaf.registerFunction("drawComboBox", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(obj.bgColour);
	g.fillRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 6);

    g.setColour(obj.itemColour2);
    g.drawRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 7, 1);
    
    g.setColour(obj.textColour);
    g.setFont(Theme.mediumFont, Theme.smallSize);
    g.drawAlignedText(obj.text, a, "centred");
    var h = a[3];
    
    //g.setColour(Colours.white);
    //g.fillTriangle([a[0] + a[2] - h/3 - 10, a[1] + h/3, h/3, h/3], Math.PI);
    
});

ComboLaf.registerFunction("drawPopupMenuBackground", function(g, obj)
{
    g.fillAll(Theme.MidColor);

});

ComboLaf.registerFunction("drawPopupMenuItem", function(g, obj)
{
    var a = obj.area;
    var h = a[3];
    
    if(obj.isSeparator)
    {
        g.setColour(Colours.white);
        g.drawLine(a[0]+10, a[0] + a[2]-10, a[1] + a[3]/2, a[1] + a[3]/2, 1.0);
        return;
    }
    
    if(obj.isTicked)
    {
		g.setColour(Colours.white);
		g.fillEllipse([a[0] + h/3, a[1] + h/3, h/3, h/3]);
    }
    
    if(obj.isHighlighted)
    {
        g.setColour(0x22FFFFFF);
        g.fillRect(obj.area);
    }
    
    g.setFont(Theme.mainFont, Theme.smallSize + 1);
    g.setColour(Colours.white);
    g.drawAlignedText(obj.text, [a[0] + h, a[1], a[2] - h, a[3]], "left");
});

ReductionLaf.registerFunction("drawLinearSlider", function(g, obj)
{
	var a = obj.area;
	
	g.setColour(obj.bgColour);
	g.fillRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 6);
	
	g.setColour(obj.textColour);
	g.drawRoundedRectangle([a[0] + 1, a[1] + 1, a[2] - 2, a[3] - 2], 7, 0.5);
	
	if (obj.style == 2)
	{
		g.setColour(obj.itemColour1);
		var w = 6;
		var x = a[2] * obj.valueNormalized - (w + 2) * obj.valueNormalized + 4;
		g.fillRoundedRectangle([x, 4, a[2], a[3] - 8], 2);
				
	}
	else if (obj.style == 3)
	{
		g.setColour(obj.itemColour1);
		var h = 6;
		var y = - a[3] * obj.valueNormalized - (h + 2) + (h + 4) * obj.valueNormalized;
		g.fillRoundedRectangle([4, y, a[2] - 8, a[3]], 2);
	}
	
});

//waveform

laf.registerFunction("drawThumbnailBackground", function(g, obj)
{
	 
});

laf.registerFunction("drawThumbnailRange", function(g, obj)
{
	 
});

laf.registerFunction("drawThumbnailRuler", function(g, obj)
{

});

laf.registerFunction("drawThumbnailPath", function(g, obj) {
   
    var a = obj.area;
	g.setGradientFill([Theme.MainColor, a[0], a[1], Theme.SecondColor, a[1], a[3]]);
	g.fillPath(obj.path, obj.area);

});

//MidiDropper

laf.registerFunction("drawMidiDropper", function(g, obj)
{
	var a = obj.area;

	 if(obj.active)
	 {
		g.setColour(Theme.LightColor);
		g.fillPath(Paths.icons.dashed, [a[0] + 3, a[1] + 3, a[2] - 6, a[3] - 6]);

		 g.setColour(Colours.withAlpha(Colours.white, 0.6));
		 g.fillPath(Paths.icons.drag, [a[2] / 2 + 110, a[3] / 2 - 8, 15, 15]);
		 
		 g.setFont(Theme.mediumFont, Theme.controlSize);
		 g.drawAlignedText("Drop Zone (Drag And Drop to DAW)", a, "centred");
		 
	 }

	 
	 if(obj.hover)
	 {
	     g.setColour(Colours.white);
	     g.drawRect(obj.area, 2);
	 }
	 
	 
});

//Dialog Button
laf.registerFunction("drawDialogButton", function(g, obj)
{
	var a = obj.area;
	var line = 1.5;
	
	g.setColour(obj.value ? Theme.MainColor : Colours.withAlpha(Colours.whitesmoke, 0.7));
	
	if (obj.over)
		g.setColour(Colours.whitesmoke);
	
	if (obj.text == "OK" || obj.text == "Cancel")
	g.drawRoundedRectangle([a[0] + 2, a[1] + 2, a[2] - 4, a[3] - 4], 10, line);
	
	if (obj.text == "Add")
	{
		g.fillPath(Paths.icons.plus, [a[2] / 2 - 5, a[1], 16, 16]);
	}
	else if (obj.text == "Rename")
	{
		g.fillPath(Paths.icons.pencil, [a[2] / 2 - 5, a[1], 15, 16]);
	}
	else if (obj.text == "Delete")
	{
		g.fillPath(Paths.icons.trash, [a[2] / 2 - 5, a[1], 12, 16]);	
	}
	else
	{
		g.setFont(Theme.boldFont, Theme.fontSize);
		g.drawAlignedText(obj.text, obj.area, "centred");
	}


});



//Functions

inline function loadExpansionIcon(obj)
{
	local expHandler = Engine.createExpansionHandler();
	
	for (e in expHandler.getExpansionList())
	{
		local img = e.getWildcardReference("Icon.png");
		
		if (isDefined(img))
		{
			obj.loadImage(img, e.getProperties().Name);
		}
	}
}

}
