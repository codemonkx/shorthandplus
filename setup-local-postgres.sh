#!/usr/bin/env bash
set -e

echo "=========================================================="
echo "🐘 Shorthand Plus — Automated Local PostgreSQL Setup"
echo "=========================================================="

echo "📦 Step 1: Installing PostgreSQL via pacman..."
sudo pacman -S --needed postgresql --noconfirm

echo "📁 Step 2: Initializing PostgreSQL data directory if needed..."
if [ ! -d "/var/lib/postgres/data/base" ]; then
  sudo -u postgres initdb -D /var/lib/postgres/data
else
  echo "Database cluster already initialized."
fi

echo "🚀 Step 3: Starting and enabling PostgreSQL service..."
sudo systemctl enable --now postgresql

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 2

echo "🔑 Step 4: Configuring postgres user password & shorthandplus database..."
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres createdb -O postgres shorthandplus 2>/dev/null || echo "Database 'shorthandplus' already exists or created."

echo "📝 Step 5: Updating .env with PostgreSQL connection string..."
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$PROJECT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  cp "$PROJECT_DIR/.env.example" "$ENV_FILE"
fi

# Set DATABASE_URL in .env
if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
  sed -i 's|^DATABASE_URL=.*|DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shorthandplus|' "$ENV_FILE"
else
  echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shorthandplus" >> "$ENV_FILE"
fi

echo "🚀 Step 6: Running PostgreSQL migrations and seeding tables..."
npm run db:migrate
npm run db:seed

echo "=========================================================="
echo "✅ Local PostgreSQL setup complete!"
echo "📡 Connected to: postgresql://postgres:postgres@localhost:5432/shorthandplus"
echo "=========================================================="
