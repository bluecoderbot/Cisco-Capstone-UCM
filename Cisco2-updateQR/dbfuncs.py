
from sqlalchemy import create_engine, exc
from sqlalchemy.orm import scoped_session, sessionmaker

# TODO: ERROR HANDELING 

engine=create_engine(postgresql://<username>:<password>@<server>:5432) #details left out for security
db = scoped_session(sessionmaker(bind=engine))

def create_tables():
    db.execute("""CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        network_designer TEXT NOT NULL,
        instructions TEXT,
        topology TEXT NOT NULL,
        name TEXT UNIQUE NOT NULL);""")
    db.execute("""CREATE TABLE IF NOT EXISTS network_components(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        serialNums TEXT ARRAY
    );
    """)

def new_project(network_designer, topology, name):
    db.execute("""INSERT INTO projects (network_designer,topology,name)
    VALUES (network_designer=:network_designer, topology=:topology, name=:name)
    """, {"network_designer":network_designer, "topology":topology, "name":name})
    db.execute("""INSERT INTO network_components (name) 
    VALUES (name=:name""",{"name":name})

def delete_project(name):
    db.execute("""DELETE FROM projects WHERE name=:name;""", {"name":name})
    db.execute("""DELETE FROM network_components WHERE name:=name""",{"name":name})

def add_instructions(name, instructions):
    db.execute("""UPDATE projects
    SET instructions=:instructions WHERE name=:name;""",{"instructions":instructions, "name":name})

def add_devices(name, device):
    db.execute("""UPDATE network_components 
    SET serialNums=array_append(serialNums,:device) 
    WHERE name=:name;""",{"name":name,"device":device})

def get_projectInfo(name):
    #TODO Convert to JSON
    projectInfo = db.execute("""SELECT * FROM projects WHERE name=:name;""",{"name":name})
    devices = db.execute("""SELECT serialNums FROM network_components WHERE name=:name""",{"name":name})
    return str(projectInfo + " " + devices)
    