const var map = Engine.createMidiList();

//Hi hat
map.setValue(61, 41);
map.setValue(23, 43);
map.setValue(24, 45);
map.setValue(25, 46);
map.setValue(26, 47);

//Ride
map.setValue(51, 48);
map.setValue(53, 49);
map.setValue(59, 50);
map.setValue(118, 51);

//Toms
map.setValue(72, 60);
map.setValue(39, 61);
map.setValue(79, 62);
map.setValue(81, 63);
map.setValue(73, 64);
map.setValue(41, 65);
map.setValue(75, 66);
map.setValue(43, 67);
map.setValue(80, 68);
map.setValue(47, 69);
map.setValue(82, 70);
map.setValue(48, 71);

//Cymbals
map.setValue(27, 72);
map.setValue(28, 73);
map.setValue(55, 74);
map.setValue(92, 75);
map.setValue(50, 76);
map.setValue(108, 77);
map.setValue(109, 78);
map.setValue(52, 79);
map.setValue(111, 80);
map.setValue(54, 81);
map.setValue(57, 82);
map.setValue(49, 83);

function onNoteOn()
{
	if (map.getValue(Message.getNoteNumber()) != -1)
	    {
	        Message.setNoteNumber(map.getValue(Message.getNoteNumber()));
	    }
}
 function onNoteOff()
{
	if (map.getValue(Message.getNoteNumber()) != -1)
	    {   
	    	Message.setNoteNumber(map.getValue(Message.getNoteNumber()));
	    }
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 