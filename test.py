import random
from math import floor

def getPoolSize(seed, fame, rep):
    chanceMod = random.uniform(.5, 1.51)
    pool = floor(chanceMod * (seed * (fame / 100) + (seed / 5) * (rep/100)))
    if(pool <= 0):
        return 0
    else:
        return pool

def getPayingCustomers(pool, fame, rep):
    chanceMod = random.uniform(.5, 1.51)
    return floor(chanceMod * (pool * (.25 + (fame / 1600) + (rep / 800))) * .4)

def runTest(seed, fame, rep):

    i = 0
    accumulator = 0
    custAccumulator = 0
    while i < 1000:
        poolSize = getPoolSize(seed, fame, rep)
        accumulator += poolSize

        customers = getPayingCustomers(poolSize, fame, rep)
        custAccumulator += customers
        i += 1
    
    print("With a fame of: " + str(fame) + " and a reputation of: " + str(rep))
    print("The average customer pool over 1000 runs is: " + str(floor(accumulator / 1000)))
    print("The average number of customers visiting over 1000 runs is: " + str(floor(custAccumulator / 1000)))
    print("=====================")


while True:
    seed = int(input("Input seed: "))
    fame = int(input("Input fame: "))
    rep = int(input("Input reputation: "))

    runTest(seed, fame, rep)