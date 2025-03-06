import numpy as np
from scipy.integrate import solve_ivp

def dynamics(t, state, thrust, mass, angle, drag_coefficient, area, air_density, wind_speed):
    x, y, z, vx, vy, vz = state
    g = 9.81  # Gravity (m/s^2)

    # Convert angle to radians
    theta = np.radians(angle)

    # Thrust components
    ax_thrust = (thrust / mass) * np.cos(theta)  # Horizontal acceleration
    az_thrust = (thrust / mass) * np.sin(theta)  # Vertical acceleration

    # Drag force
    v_rel = np.array([vx - wind_speed, vy, vz])  # Relative velocity to the wind
    v_rel_magnitude = np.linalg.norm(v_rel)
    drag_force = 0.5 * drag_coefficient * area * air_density * v_rel_magnitude**2
    drag_acceleration = drag_force / mass

    # Drag components
    ax_drag = -drag_acceleration * (vx - wind_speed) / v_rel_magnitude
    az_drag = -drag_acceleration * vz / v_rel_magnitude

    # Total accelerations
    ax = ax_thrust + ax_drag
    az = az_thrust + az_drag - g

    return [vx, vy, vz, ax, 0, az]  # No motion in y-axis

def run_simulation(thrust: float, mass: float, angle: float, drag_coefficient: float, area: float, air_density: float, wind_speed: float):
    initial_state = [0, 0, 0, 0, 0, 0]  # Start at ground level with zero velocity
    time_span = [0, 100]  # Simulate for 100 seconds

    solution = solve_ivp(dynamics, time_span, initial_state, args=(thrust, mass, angle, drag_coefficient, area, air_density, wind_speed))

    return {
        "time": solution.t.tolist(),
        "trajectory": solution.y.tolist()
    }