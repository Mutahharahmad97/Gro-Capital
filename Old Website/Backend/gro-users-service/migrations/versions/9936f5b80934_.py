"""empty message

Revision ID: 9936f5b80934
Revises: d21a29d99937
Create Date: 2020-03-17 15:03:37.912211

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9936f5b80934'
down_revision = 'd21a29d99937'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('financial', 'currency_iso_alpha3_code',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('financial', 'currency_iso_alpha3_code',
               existing_type=sa.VARCHAR(),
               nullable=False)
    # ### end Alembic commands ###
