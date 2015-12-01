function [h] = circle(r, x, y, fmt)
%CIRCLE Plot a circle on the current axes
%   Plot a circle with radius r
%   centered at (x, y)
%
%   Returns a handle to the plot

th = 0:pi/50:2*pi;

xunit = r * cos(th) + x;
yunit = r * sin(th) + y;
h = plot(xunit, yunit, fmt);
end

