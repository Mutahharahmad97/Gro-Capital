"""empty message

Revision ID: 1e3a17b100f8
Revises: e31c8216184d
Create Date: 2020-03-23 16:08:32.832680

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e3a17b100f8'
down_revision = 'e31c8216184d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('companies', sa.Column('rating', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('companies', 'rating')
    # ### end Alembic commands ###