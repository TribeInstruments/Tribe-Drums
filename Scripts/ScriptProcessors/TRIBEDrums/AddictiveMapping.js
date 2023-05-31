const var map = Engine.createMidiList();

//Brushes
map.setValue(30, 28);
map.setValue(35, 29);
map.setValue(43, 30);
map.setValue(40, 31);
map.setValue(39, 32);
map.setValue(44, 34);

//Snare
map.setValue(42, 37);
map.setValue(44, 39);
map.setValue(37, 40);

//Hi hat
map.setValue(49, 41);
map.setValue(50, 42);
map.setValue(59, 43);
map.setValue(48, 44);
map.setValue(54, 45);
map.setValue(55, 46);
map.setValue(56, 47);

//Ride
map.setValue(60, 48);
map.setValue(61, 49);
map.setValue(62, 50);
map.setValue(63, 51);

//Perc/Xtra
map.setValue(47, 53);
map.setValue(73, 54);
map.setValue(74, 55);
map.setValue(100, 56);
map.setValue(96, 57);
map.setValue(97, 58);
map.setValue(98, 59);

//Cymbals
map.setValue(77, 74);
map.setValue(78, 76);
map.setValue(80, 81);
map.setValue(81, 82);
map.setValue(89, 83);

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
 