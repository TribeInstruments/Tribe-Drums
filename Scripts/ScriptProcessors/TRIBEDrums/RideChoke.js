 //Use const var for constants for improved performance.
 
 const var RideChoke = [48, 49, 50, 51, 52];
 
 //  An Array is also a constant, even if it will be populated later on
 const var evtList = [];
 
 // make sure it has enough storage to avoid allocation during the noteOn callback
 evtList.reserve(64);
 function onNoteOn()
{
	for (i = 0; i < 5; i++)
	        
	    if(Message.getNoteNumber() == RideChoke[i])
	    {
	        // Always use the for ... in loop if you don't need the index
	        for(eventId in evtList)
	        {
	            // Send the note off command for the given event id            
	            Synth.addVolumeFade(eventId, 300, -100);            
	        }
	        
	        // Clear all notes
	        evtList.clear();
	        
	        // This is necessary because you will kill the note artificially and HISE
	        // can only kill artifical notes for stability reasons
	        Message.makeArtificial();            
	            
	        // Add this ID to the list (it'll add the artificial event ID)
	        evtList.push(Message.getEventId());
	    }
	    
	        
	    /*if(Message.getNoteNumber() != HihatPedal & Message.getNoteNumber() != HihatTight 
	    & Message.getNoteNumber() != HihatClose & Message.getNoteNumber() != HihatLoose 
	    & Message.getNoteNumber() != HihatOpen1 & Message.getNoteNumber() != HihatOpen2 
	    & Message.getNoteNumber() != HihatOpening & Message.getNoteNumber() != HihatFootSplash)
	    {
	      Message.ignoreEvent(true);
	    }*/
	    
	    //Console.print(Message.getNoteNumber());
}


 function onNoteOff()
{
	
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
 