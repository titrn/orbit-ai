import numpy as np
from scipy.integrate import solve_ivp

# defining the variables for aerodynamics
def dynamics(t, state, thrust, mass):
    x, y, z, vx, vy, vz = state
    g = 9.81 # Gravity (m/s^2)

    # Acceleration model: Thrust and Gravity
    ax = thrust / mass;
    ay = 0;
    az = -g; # gravity pulling down

    return [vx, vy, vz, ax, ay, az]

# function for running the simulation
def run_simulation(thrust: float, mass: float):
    initial_state = [0, 0, 1000, 100, 0, 0] # (xyz-position, xyz-velocity)
    time_span = [0, 100] # (start, end) in seconds
    solution = solve_ivp(dynamics, time_span, initial_state, args=(thrust, mass))  # args = (Thrust, Mass)

    return {
        "time": solution.t.tolist(),
        "trajectory": solution.y.tolist()
    }

# print(solution.y) # prints the simulated trajectory