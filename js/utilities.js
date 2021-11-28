//utilities.js
// utilitarian functions

const U = {
    // function for getting document element by ID
    $: function(id) {
        'use strict';
        if (typeof id == 'string'){
            return document.getElementById(id);
        }
    }, // end $ function
    
    // function for setting the text of an element
    setText: function(id, message) {
    'use strict';
    console.log("setText() - 1. beginning");
    if ((typeof id == 'string') && (typeof message == 'string')) {
    
    // get reference to the element
    var output = this.$(id);
    if (!output) return false;
    console.log("setText() - 2. get ref done");
    
    //set text
    if (output.textContent !== undefined) {
    output.textContent = message;
    }
    else {
        output.innerText = message;
    }
    return true
    }
    
    }, //end setText

    
    enableTooltips:function(id) {
        'use strict';
        console.log("enableTooltips() - 1. beginning");
        //get reference to the element
        const elem = this.$(id);
        console.log("enableTooltips() - 2. get ref done");
        // add 4 handlers to the element
        this.addEvent(elem, 'focus', this.showTooltip);
        this.addEvent(elem, 'mouseover', this.showTooltip);
        this.addEvent(elem, 'blur', this.hideTooltip);
        this.addEvent(elem,'mouseout', this.hideTooltip);
        console.log("enableTooltips() - 3. handlers done");
        console.log("enableTooltips() - 4. done");
    }, // end enableTooltip function

    showTooltip: function(e) {
        'use strict';
        // get event object
        if (typeof e == 'undefined') var e = window.event;
        // get the event target
        var target = e.target || e.srcElement;
        document.getElementById(target.name + 'tip').style.visibility = 'visible';
    },// end showTooltip function

    hideTooltip: function(e) {
        'use strict';
        //get event object
        if (typeof e == 'undefined') var e = window.event;
        
        //get event target
        var target = e.target || e.srcElement;
        document.getElementById(target.name + 'tip').style.visibility = 'hidden';
        
    },// end hideTooltip function

} //end U
    
