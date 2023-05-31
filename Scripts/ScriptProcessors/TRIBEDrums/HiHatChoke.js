 //Use const var for constants for improved performance.
 const var HihatClose = 41;
 const var HihatPedal = 42;
 const var HihatOpen1 = 43;
 const var HihatOpen2 = 44;
 const var HihatOpening = 45;
 const var HihatLoose = 46;
 const var HihatTight = 47;
  
 const var HihatArt = [HihatPedal, HihatTight, HihatClose, HihatLoose, 
 HihatOpen1, HihatOpen2, HihatOpening];
 
 //  An Array is also a constant, even if it will be populated later on
 const var evtList = [];
 
 // make sure it has enough storage to avoid allocation during the noteOn callback
 evtList.reserve(64);
 function onNoteOn()
{
	for (i = 0; i < 8; i++)
	        
	    if(Message.getNoteNumber() == HihatArt[i])
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
 