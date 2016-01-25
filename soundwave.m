function soundwave(h, k)
    % create a soundwave animation on current axes
    % centered at (h, k)
    
    c = circle(0, h, k, 'r');
    mics = [150 0; 0 150; -150 0; 0 -150];
    tolerance = 5.625;
    
    % speed of sound: 11.25 feet per centisecond
    for r = 0.1:11.25:499.96
        delete(c);
        c = circle(r, h, k, 'r');
        
        % detect soundwave collisions with microphones
        % using the standard equation for a circle
        % (x-h)^2 + (y-k)^2 = r^2
        for m = 1:1:4
            lhs = (mics(m,1) - h)^2 + (mics(m,2) - k)^2;
            if lhs > (r - tolerance)^2 && lhs < (r + tolerance)^2
                fprintf('Spike detected on mic %d\n', m);
            end
        end
        
        pause(0.01);
    end
    delete(c);
    
    % test comment for slack integration