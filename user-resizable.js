jQuery(function() {
  $.fn.userResizable = function() {
    $.each(this, function(i, li) {

      var dragging;
      var lastMove;

      $(li).on('mousemove', function(event) {
        // if (dragging) return;
        var top, bottom, left, right, direction, tolerance, resize, image;
        image = $(this)[0];
        $(image).off('.dragimage');
        rect = image.getBoundingClientRect();
        top = rect.top;
        bottom = rect.bottom;
        left = rect.left;
        right = rect.right;
        tolerance = 15;
        direction = '';
        if (event.clientY >= top && event.clientY < top + tolerance)
          direction += 'n';
        if (event.clientY <= bottom && event.clientY > bottom - tolerance)
          direction += 's';
        if (event.clientX <= right && event.clientX > right - tolerance)
          direction += 'e';
        if (event.clientX >= left && event.clientX < left + tolerance)
          direction += 'w';

        if (direction == '') {
          image.style.cursor = 'default';
        } else {
          resize = true;
        }
        image.style.cursor = direction + '-resize';

        // lastMove = event;
        $(image).on('mousedown.dragimage', function(event) {
          dragging = true;
          $(document).on('mousemove.resizeimage', function(event) {

            event.preventDefault();
            if (!lastMove) {
              lastMove = event;
              return;
            }
            var dx, dy;
            dx = event.clientX - lastMove.clientX;
            dy = event.clientY - lastMove.clientY;
            if (direction.indexOf('n') > -1)
              image.height -= dy;
            if (direction.indexOf('s') > -1)
              image.height += dy;
            if (direction.indexOf('e') > -1)
              image.width += dx;
            if (direction.indexOf('w') > -1)
              image.width -= dx;
            // console.log(dx, dy);
            lastMove = event;

          });
        });

      });


      $(document).on('mouseup', function() {
        dragging = false;
        lastMove = false;
        // $(document).off('.dragimage');
        $(document).off('mousemove.resizeimage');
      });


    });

  }

});
