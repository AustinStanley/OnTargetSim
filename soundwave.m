function soundwave(h, k)
    % create a soundwave animation on current axes
    % centered at (h, k)
    c = circle(0, h, k, 'r');
    
    % speed of sound: 11.25 feet per centisecond
    for r = 0.1:11.25:499.96
        delete(c);
        c = circle(r, h, k, 'r');
        pause(0.01);
    end
    delete(c);