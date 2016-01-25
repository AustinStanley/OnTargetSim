function varargout = sim_gui(varargin)
    % SIM_GUI MATLAB code for sim_gui.fig
    %      SIM_GUI, by itself, creates a new SIM_GUI or raises the existing
    %      singleton*.
    %
    %      H = SIM_GUI returns the handle to a new SIM_GUI or the handle to
    %      the existing singleton*.
    %
    %      SIM_GUI('CALLBACK',hObject,eventData,handles,...) calls the local
    %      function named CALLBACK in SIM_GUI.M with the given input arguments.
    %
    %      SIM_GUI('Property','Value',...) creates a new SIM_GUI or raises the
    %      existing singleton*.  Starting from the left, property value pairs are
    %      applied to the GUI before sim_gui_OpeningFcn gets called.  An
    %      unrecognized property name or invalid value makes property application
    %      stop.  All inputs are passed to sim_gui_OpeningFcn via varargin.
    %
    %      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
    %      instance to run (singleton)".
    %
    % See also: GUIDE, GUIDATA, GUIHANDLES

    % Edit the above text to modify the response to help sim_gui

    % Last Modified by GUIDE v2.5 30-Nov-2015 20:17:33

    % Begin initialization code - DO NOT EDIT
    gui_Singleton = 1;
    gui_State = struct('gui_Name',       mfilename, ...
                       'gui_Singleton',  gui_Singleton, ...
                       'gui_OpeningFcn', @sim_gui_OpeningFcn, ...
                       'gui_OutputFcn',  @sim_gui_OutputFcn, ...
                       'gui_LayoutFcn',  [] , ...
                       'gui_Callback',   []);
    if nargin && ischar(varargin{1})
        gui_State.gui_Callback = str2func(varargin{1});
    end

    if nargout
        [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
    else
        gui_mainfcn(gui_State, varargin{:});
    end
    % End initialization code - DO NOT EDIT


% --- Executes just before sim_gui is made visible.
function sim_gui_OpeningFcn(hObject, eventdata, handles, varargin)
    % This function has no output args, see OutputFcn.
    % hObject    handle to figure
    % eventdata  reserved - to be defined in a future version of MATLAB
    % handles    structure with handles and user data (see GUIDATA)
    % varargin   command line arguments to sim_gui (see VARARGIN)

    % Choose default command line output for sim_gui
    handles.output = hObject;

    % plot target circle
    axes(handles.target_axes)
    hold on
    circle(150, 0, 0, 'b');
    plot(0, 0, '+b')

    % add microphones
    mic_coords = [150 0; 0 150; -150 0; 0 -150];
    plot(mic_coords(:,1), mic_coords(:,2), 'k.', 'MarkerSize', 20)
    hold off

    % Update handles structure
    guidata(hObject, handles);

    % UIWAIT makes sim_gui wait for user response (see UIRESUME)
    % uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = sim_gui_OutputFcn(hObject, eventdata, handles) 
    % varargout  cell array for returning output args (see VARARGOUT);
    % hObject    handle to figure
    % eventdata  reserved - to be defined in a future version of MATLAB
    % handles    structure with handles and user data (see GUIDATA)

    % Get default command line output from handles structure
    varargout{1} = handles.output;


% --- Executes on mouse press over axes background.
function target_axes_ButtonDownFcn(hObject, eventdata, handles)
    % hObject    handle to target_axes (see GCBO)
    % eventdata  reserved - to be defined in a future version of MATLAB
    % handles    structure with handles and user data (see GUIDATA)
    handles = guidata(hObject);

    axes(hObject);
    hold on
    xlim([-150 150]);
    ylim([-150 150]);
    [h, k] = ginput(1);
    soundwave(h, k);
    hold off

    guidata(hObject, handles);