function varargout = spike_sim(varargin)
% SPIKE_SIM MATLAB code for spike_sim.fig
%      SPIKE_SIM, by itself, creates a new SPIKE_SIM or raises the existing
%      singleton*.
%
%      H = SPIKE_SIM returns the handle to a new SPIKE_SIM or the handle to
%      the existing singleton*.
%
%      SPIKE_SIM('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in SPIKE_SIM.M with the given input arguments.
%
%      SPIKE_SIM('Property','Value',...) creates a new SPIKE_SIM or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before spike_sim_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to spike_sim_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help spike_sim

% Last Modified by GUIDE v2.5 12-Feb-2016 09:28:29

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @spike_sim_OpeningFcn, ...
                   'gui_OutputFcn',  @spike_sim_OutputFcn, ...
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


% --- Executes just before spike_sim is made visible.
function spike_sim_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to spike_sim (see VARARGIN)

% Choose default command line output for spike_sim
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% UIWAIT makes spike_sim wait for user response (see UIRESUME)
% uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = spike_sim_OutputFcn(hObject, eventdata, handles) 
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;


% --- Executes on button press in btn_start.
function btn_start_Callback(hObject, eventdata, handles)
% hObject    handle to btn_start (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
    handles = guidata(hObject);
    
    cla(handles.axes1);
    cla(handles.axes2);
    t1 = spike(handles.axes1);
    t2 = spike(handles.axes2);
    
    diff = abs(t1 - t2);
    set(handles.txt_tdoa, 'String', sprintf('TDOA: %.2f seconds', diff));
    
    guidata(hObject, handles);
