function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function moveWithArrowKeys(left, bottom, onDirectionChange){
        let direction = null;
        let x = left;
        let y = bottom;
    
        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        width = innerWidth - 65
        height = innerHeight - 65
        // only useful if user does not change browser size.
        function bounce() {
            if (x === 0) {
                x++
            } else if (x === width) {
                x = x - 1
            } else if (y === height) {
                y = y - 1
            } else if (y === 100) {
                y++
            }
        }
        
        function moveCharacter(){
            if(x < width && x > 0 && y < height && y > 100) {
            if(direction === 'west'){
                x-=1
            }
            if(direction === 'north'){
                y+=1
            }
            if(direction === 'east'){
                x+=1
            }
            if(direction === 'south'){
                y-=1
            }
            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
            } else {
                bounce()
            }
        }
        
        setInterval(moveCharacter, 1)
        
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowLeft'){
                direction = 'west'
            }
            if(e.key === 'ArrowUp'){
                direction = 'north'
            }
            if(e.key === 'ArrowRight'){
                direction = 'east'
            }
            if(e.key === 'ArrowDown'){
                direction = 'south'
            }

            onDirectionChange(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = null

            onDirectionChange(direction)
        })
    }
    
    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }        
}
