-- ogni organizzazione, tipo team-valtellina, vita-bella-run, ...
CREATE TABLE organizations {
  id TEXT PRIMARY KEY,
  name TEXT,
  logo TEXT,
}

-- per ogni account stripe
CREATE TABLE vendors {
  id TEXT PRIMARY KEY,
  name TEXT,
}

-- mi sa che urge rinomina - un qualcosa che aggrega gli eventi
CREATE TABLE circuit {
  id TEXT PRIMARY KEY,
  name TEXT,
}

CREATE TABLE events {
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  edition SMALLINT NOT NULL,
  status TEXT NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE,
  organization_id REFERENCES organizations (id) ON UPDATE CASCADE,
  vendor_id REFERENCES vendors (id) ON UPDATE CASCADE,
  category TEXT,
  capacity,
  detail
  summary
  description
  body
  flyer
  summary_image
  regulation
}

INSERT INTO organizations VALUES
('pro-loco-bema', 'Pro Loco Bema'),
('team-valtellina', 'Team Valtellina'),

-- gli utenti baseranno i privilegi su vendors e organizations - sarebbe più corretto circuit