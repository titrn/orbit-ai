import numpy as np
from scipy.integrate import solve_ivp

# defining the variables for aerodynamics
def dynamics(t, state, thrust, mass, angle):
    x, y, z, vx, vy, vz = state
    g = 9.81  # Gravity (m/s^2)

    # Convert angle to radians
    theta = np.radians(angle)

    # Thrust components
    ax = (thrust / mass) * np.cos(theta)  # Horizontal acceleration
    az = (thrust / mass) * np.sin(theta) - g  # Vertical acceleration

    return [vx, vy, vz, ax, 0, az]  # No motion in y-axis


# function for running the simulation
def run_simulation(thrust: float, mass: float, angle: float):
    initial_state = [0, 0, 0, 0, 0, 0]  # Start at ground level with zero velocity
    time_span = [0, 100]  # Simulate for 100 seconds

    solution = solve_ivp(dynamics, time_span, initial_state, args=(thrust, mass, angle))

    return {
        "time": solution.t.tolist(),
        "trajectory": solution.y.tolist()
    }


# print(solution.y) # prints the simulated trajectory