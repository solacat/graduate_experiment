#********Jensen-Shannon Divergence**********
# Zealseeker | www.zealseeker.com          
#*******************************************
#class: JSD
#method: JSD_core(q,p)
#input:
#   q=[q1,q2,q3,...]
#   p=[p1,p2,p3,...]
#output:
#    JS divergence between set p and set q
#*******************************************

from math import log
from numpy import array

class JSD:
    def KLD(self,p,q):
        if 0 in q :
            raise ValueError
        return sum(_p * log(_p/_q) for (_p,_q) in zip(p,q) if _p!=0)

    def JSD_core(self,p,q):
        M = [0.5*(_p+_q) for _p,_q in zip(p,q)]
        return 0.5*self.KLD(p,M)+0.5*self.KLD(q,M)

#********Test*******
p = [0.2,0.3,0.4,1,1]
q = [0.3,0.3,0.2,0.1,0]

jsd = JSD()
print jsd.JSD_core(p,q)
print jsd.JSD_core(q,p)

#--Result--
#0.566811410952
#0.566811410952