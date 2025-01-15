import random
import csv

# Configuration
participant_count = int(input("Enter the number of participants: "))  # User input for participant count
treatment_ratio = 0.6  # 60% Treatment
control_ratio = 0.4    # 40% Control (split evenly into 3 groups)

# Group labels
groups = [
    "Treatment Group (60%)",
    "Control Group 1 - Cats vs. Dogs (13.33%)",
    "Control Group 2 - Best Music Genre (13.33%)",
    "Control Group 3 - Best Airline (13.33%)"
]

# Step 1: Generate Random Group Assignments
records = []
for i in range(participant_count):
    random_num = random.random()  # Generate random number between 0 and 1
    if random_num < treatment_ratio:
        group = groups[0]  # Treatment group (60%)
    else:
        # Scale random number for control group
        control_random = (random_num - treatment_ratio) / control_ratio
        if control_random < 1 / 3:
            group = groups[1]  # Control Group 1
        elif control_random < 2 / 3:
            group = groups[2]  # Control Group 2
        else:
            group = groups[3]  # Control Group 3

    # Append records with a placeholder for IDs
    records.append(["", f"{random_num:.4f}", group])  # Empty ID to be filled later

print("Random numbers and groups generated!")
print("Now enter participant IDs.")

# Step 2: Input Participant IDs
participant_ids = input("Enter participant IDs (comma-separated): ").split(",")
participant_ids = [id.strip() for id in participant_ids]  # Clean up whitespace

if len(participant_ids) != participant_count:
    print("Error: Number of participant IDs must match the number of generated participants.")
    exit()

# Match IDs with records
matched_records = []
for i in range(participant_count):
    matched_records.append([participant_ids[i], records[i][1], records[i][2]])

print("Participant IDs matched successfully!")

# Step 3: Export to CSV
filename = "group_assignments.csv"
with open(filename, mode="w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Participant ID", "Random Number", "Group Assignment"])
    writer.writerows(matched_records)

print(f"Assignments saved to {filename}")

# Step 4: Display Group Counts
summary = {group: 0 for group in groups}
for record in matched_records:
    summary[record[2]] += 1

print("\nGroup Counts:")
for group, count in summary.items():
    print(f"{group}: {count} ({(count / participant_count) * 100:.2f}%)")
